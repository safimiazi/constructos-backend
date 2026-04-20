"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const document_entity_1 = require("./entities/document.entity");
let DocumentsService = class DocumentsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll(tenantId, q) {
        const { projectId, folder, search, page = 1, limit = 20 } = q;
        const qb = this.repo.createQueryBuilder('d')
            .where('d.tenant_id = :tenantId AND d.deleted_at IS NULL', { tenantId })
            .orderBy('d.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        if (projectId)
            qb.andWhere('d.project_id = :projectId', { projectId });
        if (folder)
            qb.andWhere('d.folder = :folder', { folder });
        if (search)
            qb.andWhere('d.name ILIKE :s', { s: `%${search}%` });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findOne(tenantId, id) {
        const d = await this.repo.findOne({ where: { id, tenantId } });
        if (!d)
            throw new common_1.NotFoundException('Document not found');
        return d;
    }
    create(tenantId, userId, dto) {
        return this.repo.save(this.repo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async update(tenantId, id, dto) {
        await this.findOne(tenantId, id);
        await this.repo.update({ id, tenantId }, dto);
        return this.findOne(tenantId, id);
    }
    async approve(tenantId, id) {
        await this.repo.update({ id, tenantId }, { status: document_entity_1.DocumentStatus.APPROVED });
        return this.findOne(tenantId, id);
    }
    async remove(tenantId, id) {
        await this.findOne(tenantId, id);
        await this.repo.softDelete({ id, tenantId });
    }
    getFolders(tenantId) {
        return this.repo.createQueryBuilder('d')
            .select('DISTINCT d.folder', 'folder')
            .where('d.tenant_id = :tenantId AND d.folder IS NOT NULL AND d.deleted_at IS NULL', { tenantId })
            .getRawMany();
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map