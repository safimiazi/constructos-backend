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
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
const lead_entity_1 = require("./entities/lead.entity");
let CrmService = class CrmService {
    clientRepo;
    leadRepo;
    constructor(clientRepo, leadRepo) {
        this.clientRepo = clientRepo;
        this.leadRepo = leadRepo;
    }
    findClients(tenantId, q) {
        const { search, page = 1, limit = 20 } = q;
        const qb = this.clientRepo.createQueryBuilder('c')
            .where('c.tenant_id = :tenantId AND c.deleted_at IS NULL', { tenantId })
            .orderBy('c.name', 'ASC').skip((page - 1) * limit).take(limit);
        if (search)
            qb.andWhere('c.name ILIKE :s OR c.email ILIKE :s', { s: `%${search}%` });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findClient(tenantId, id) {
        const c = await this.clientRepo.findOne({ where: { id, tenantId } });
        if (!c)
            throw new common_1.NotFoundException('Client not found');
        return c;
    }
    createClient(tenantId, userId, dto) {
        return this.clientRepo.save(this.clientRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateClient(tenantId, id, dto) {
        await this.findClient(tenantId, id);
        await this.clientRepo.update({ id, tenantId }, dto);
        return this.findClient(tenantId, id);
    }
    async removeClient(tenantId, id) {
        await this.findClient(tenantId, id);
        await this.clientRepo.softDelete({ id, tenantId });
    }
    findLeads(tenantId, q) {
        const { stage, page = 1, limit = 20 } = q;
        const qb = this.leadRepo.createQueryBuilder('l')
            .where('l.tenant_id = :tenantId AND l.deleted_at IS NULL', { tenantId })
            .orderBy('l.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        if (stage)
            qb.andWhere('l.stage = :stage', { stage });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findLead(tenantId, id) {
        const l = await this.leadRepo.findOne({ where: { id, tenantId } });
        if (!l)
            throw new common_1.NotFoundException('Lead not found');
        return l;
    }
    createLead(tenantId, userId, dto) {
        return this.leadRepo.save(this.leadRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateLead(tenantId, id, dto) {
        await this.findLead(tenantId, id);
        await this.leadRepo.update({ id, tenantId }, dto);
        return this.findLead(tenantId, id);
    }
    async moveLeadStage(tenantId, id, stage) {
        await this.leadRepo.update({ id, tenantId }, { stage });
        return this.findLead(tenantId, id);
    }
    async removeLead(tenantId, id) {
        await this.findLead(tenantId, id);
        await this.leadRepo.softDelete({ id, tenantId });
    }
    getPipelineSummary(tenantId) {
        return this.leadRepo.createQueryBuilder('l')
            .select('l.stage', 'stage')
            .addSelect('COUNT(*)', 'count')
            .addSelect('SUM(l.expected_value)', 'totalValue')
            .where('l.tenant_id = :tenantId AND l.deleted_at IS NULL', { tenantId })
            .groupBy('l.stage')
            .getRawMany();
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CrmService);
//# sourceMappingURL=crm.service.js.map