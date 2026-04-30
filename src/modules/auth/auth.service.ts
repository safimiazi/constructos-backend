import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User, UserStatus } from '../users/entities/user.entity';
import { Tenant, TenantStatus } from '../tenants/entities/tenant.entity';
import { Subscription } from '../billing/entities/subscription.entity';
import { Plan } from '../billing/entities/plan.entity';
import { LoginDto, RegisterTenantDto } from './dto/auth.dto';
import {
  JwtPayload,
  UserRole,
  PlanTier,
} from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
    @InjectRepository(Subscription)
    private subRepo: Repository<Subscription>,
    @InjectRepository(Plan)
    private planRepo: Repository<Plan>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await user.validatePassword(dto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException('Account is inactive');
    }

    user.lastLoginAt = new Date();
    await this.userRepo.save(user);

    return this.generateTokens(user);
  }

  async registerTenant(dto: RegisterTenantDto) {
    const existingSlug = await this.tenantRepo.findOne({ where: { slug: dto.slug } });
    if (existingSlug) throw new ConflictException('Slug already taken');

    const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existingUser) throw new ConflictException('Email already registered');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tenant = queryRunner.manager.create(Tenant, {
        slug: dto.slug,
        companyName: dto.companyName,
        status: TenantStatus.TRIAL,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      });
      const savedTenant = await queryRunner.manager.save(tenant);

      const user = queryRunner.manager.create(User, {
        tenantId: savedTenant.id,
        email: dto.email,
        passwordHash: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: UserRole.OWNER,
        status: UserStatus.ACTIVE,
      });
      const savedUser = await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return this.generateTokens(savedUser, savedTenant);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async logout(userId: string) {
    await this.userRepo.update(userId, { refreshTokenHash: null });
  }

  async refreshToken(userId: string, refreshToken?: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    if (refreshToken && user.refreshTokenHash) {
      const valid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
      if (!valid) throw new UnauthorizedException('Invalid refresh token');
    }
    return this.generateTokens(user);
  }

  async refreshFromToken(refreshToken: string) {
    let payload: { sub: string };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const user = await this.userRepo.findOne({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException('User not found');
    if (user.refreshTokenHash) {
      const valid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
      if (!valid) throw new UnauthorizedException('Refresh token has been revoked');
    }
    return this.generateTokens(user);
  }

  async forgotPassword(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    // Always return same message to prevent email enumeration
    if (!user) return { message: 'If that email exists, a reset link has been sent.' };
    // Generate a secure token: sign a short-lived JWT
    const resetToken = this.jwtService.sign(
      { sub: user.id, purpose: 'password_reset' },
      { secret: this.configService.get('JWT_SECRET'), expiresIn: '1h' },
    );
    // In production: send email with resetToken link
    // For development: log to console only
    if (this.configService.get('NODE_ENV') !== 'production') {
      console.log(`[DEV] Password reset token for ${email}: ${resetToken}`);
    }
    return { message: 'If that email exists, a reset link has been sent.' };
  }

  async resetPassword(token: string, newPassword: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
    } catch {
      throw new BadRequestException('Invalid or expired reset token');
    }
    if (payload.purpose !== 'password_reset') {
      throw new BadRequestException('Invalid token purpose');
    }
    if (newPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }
    const hash = await bcrypt.hash(newPassword, 12);
    await this.userRepo.update(payload.sub, { passwordHash: hash, refreshTokenHash: null });
    return { message: 'Password reset successful' };
  }

  private async generateTokens(user: User, tenant?: Tenant) {
    // Fetch plan tier from active subscription
    let planTier: PlanTier | null = null;
    if (user.tenantId) {
      const sub = await this.subRepo.createQueryBuilder('s')
        .innerJoin('plans', 'p', 'p.id = s.plan_id')
        .select('p.tier', 'tier')
        .where('s.tenant_id = :tid', { tid: user.tenantId })
        .orderBy('s.created_at', 'DESC')
        .limit(1)
        .getRawOne();
      planTier = (sub?.tier as PlanTier) ?? null;
    }

    const payload: JwtPayload = {
      sub: user.id,
      tenantId: user.tenantId,
      role: user.role,
      planTier,
      isSuperAdmin: user.isSuperAdmin,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    });

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
      },
    );

    const refreshHash = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.update(user.id, { refreshTokenHash: refreshHash });

    return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName, tenantId: user.tenantId, isSuperAdmin: user.isSuperAdmin } };
  }
}
