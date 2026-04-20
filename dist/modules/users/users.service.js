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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll(tenantId, q) {
        const { search, role, page = 1, limit = 20 } = q;
        const qb = this.repo.createQueryBuilder('u')
            .where('u.tenant_id = :tenantId AND u.deleted_at IS NULL', { tenantId })
            .orderBy('u.created_at', 'DESC')
            .skip((page - 1) * limit).take(limit);
        if (search)
            qb.andWhere('(u.email ILIKE :s OR u.first_name ILIKE :s OR u.last_name ILIKE :s)', { s: `%${search}%` });
        if (role)
            qb.andWhere('u.role = :role', { role });
        return qb.getManyAndCount().then(([data, total]) => ({
            data: data.map(u => this.sanitize(u)),
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        }));
    }
    async findOne(tenantId, id) {
        const u = await this.repo.findOne({ where: { id, tenantId } });
        if (!u)
            throw new common_1.NotFoundException('User not found');
        return this.sanitize(u);
    }
    async invite(tenantId, dto) {
        const exists = await this.repo.findOne({ where: { email: dto.email, tenantId } });
        if (exists)
            throw new common_1.ConflictException('Email already exists in this tenant');
        const u = this.repo.create({
            ...dto,
            tenantId,
            passwordHash: dto.password,
            status: user_entity_1.UserStatus.ACTIVE,
        });
        const saved = await this.repo.save(u);
        return this.sanitize(saved);
    }
    async update(tenantId, id, dto) {
        await this.findOne(tenantId, id);
        if (dto.password) {
            dto.passwordHash = await bcrypt.hash(dto.password, 12);
            delete dto.password;
        }
        await this.repo.update({ id, tenantId }, dto);
        return this.findOne(tenantId, id);
    }
    async remove(tenantId, id) {
        await this.findOne(tenantId, id);
        await this.repo.softDelete({ id, tenantId });
    }
    async getProfile(userId) {
        const u = await this.repo.findOne({ where: { id: userId } });
        if (!u)
            throw new common_1.NotFoundException('User not found');
        return this.sanitize(u);
    }
    sanitize(u) {
        const { passwordHash, refreshTokenHash, ...rest } = u;
        return rest;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map