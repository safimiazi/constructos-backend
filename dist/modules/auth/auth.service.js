"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("../users/entities/user.entity");
const tenant_entity_1 = require("../tenants/entities/tenant.entity");
const subscription_entity_1 = require("../billing/entities/subscription.entity");
const plan_entity_1 = require("../billing/entities/plan.entity");
const jwt_payload_interface_1 = require("../../common/interfaces/jwt-payload.interface");
let AuthService = class AuthService {
    userRepo;
    tenantRepo;
    subRepo;
    planRepo;
    jwtService;
    configService;
    dataSource;
    constructor(userRepo, tenantRepo, subRepo, planRepo, jwtService, configService, dataSource) {
        this.userRepo = userRepo;
        this.tenantRepo = tenantRepo;
        this.subRepo = subRepo;
        this.planRepo = planRepo;
        this.jwtService = jwtService;
        this.configService = configService;
        this.dataSource = dataSource;
    }
    async login(dto) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });
        if (!user || !(await user.validatePassword(dto.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.status === user_entity_1.UserStatus.INACTIVE) {
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        user.lastLoginAt = new Date();
        await this.userRepo.save(user);
        return this.generateTokens(user);
    }
    async registerTenant(dto) {
        const existingSlug = await this.tenantRepo.findOne({ where: { slug: dto.slug } });
        if (existingSlug)
            throw new common_1.ConflictException('Slug already taken');
        const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
        if (existingUser)
            throw new common_1.ConflictException('Email already registered');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tenant = queryRunner.manager.create(tenant_entity_1.Tenant, {
                slug: dto.slug,
                companyName: dto.companyName,
                status: tenant_entity_1.TenantStatus.TRIAL,
                trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            });
            const savedTenant = await queryRunner.manager.save(tenant);
            const user = queryRunner.manager.create(user_entity_1.User, {
                tenantId: savedTenant.id,
                email: dto.email,
                passwordHash: dto.password,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                role: jwt_payload_interface_1.UserRole.OWNER,
                status: user_entity_1.UserStatus.ACTIVE,
            });
            const savedUser = await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
            return this.generateTokens(savedUser, savedTenant);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async logout(userId) {
        await this.userRepo.update(userId, { refreshTokenHash: null });
    }
    async refreshToken(userId, refreshToken) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        if (refreshToken && user.refreshTokenHash) {
            const valid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
            if (!valid)
                throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        return this.generateTokens(user);
    }
    async refreshFromToken(refreshToken) {
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const user = await this.userRepo.findOne({ where: { id: payload.sub } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        if (user.refreshTokenHash) {
            const valid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
            if (!valid)
                throw new common_1.UnauthorizedException('Refresh token has been revoked');
        }
        return this.generateTokens(user);
    }
    async forgotPassword(email) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user)
            return { message: 'If that email exists, a reset link has been sent.' };
        const resetToken = this.jwtService.sign({ sub: user.id, purpose: 'password_reset' }, { secret: this.configService.get('JWT_SECRET'), expiresIn: '1h' });
        if (this.configService.get('NODE_ENV') !== 'production') {
            console.log(`[DEV] Password reset token for ${email}: ${resetToken}`);
        }
        return { message: 'If that email exists, a reset link has been sent.' };
    }
    async resetPassword(token, newPassword) {
        let payload;
        try {
            payload = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
        }
        catch {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        if (payload.purpose !== 'password_reset') {
            throw new common_1.BadRequestException('Invalid token purpose');
        }
        if (newPassword.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters');
        }
        const hash = await bcrypt.hash(newPassword, 12);
        await this.userRepo.update(payload.sub, { passwordHash: hash, refreshTokenHash: null });
        return { message: 'Password reset successful' };
    }
    async generateTokens(user, tenant) {
        let planTier = null;
        if (user.tenantId) {
            const sub = await this.subRepo.createQueryBuilder('s')
                .innerJoin('plans', 'p', 'p.id = s.plan_id')
                .select('p.tier', 'tier')
                .where('s.tenant_id = :tid', { tid: user.tenantId })
                .orderBy('s.created_at', 'DESC')
                .limit(1)
                .getRawOne();
            planTier = sub?.tier ?? null;
        }
        const payload = {
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
        const refreshToken = this.jwtService.sign({ sub: user.id }, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
        });
        const refreshHash = await bcrypt.hash(refreshToken, 10);
        await this.userRepo.update(user.id, { refreshTokenHash: refreshHash });
        return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName, tenantId: user.tenantId, isSuperAdmin: user.isSuperAdmin } };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(tenant_entity_1.Tenant)),
    __param(2, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(3, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map