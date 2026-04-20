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
exports.HseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const incident_entity_1 = require("./entities/incident.entity");
let HseService = class HseService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll(tenantId, q) {
        const { projectId, status, page = 1, limit = 20 } = q;
        const qb = this.repo.createQueryBuilder('i')
            .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
            .orderBy('i.incident_date', 'DESC').skip((page - 1) * limit).take(limit);
        if (projectId)
            qb.andWhere('i.project_id = :projectId', { projectId });
        if (status)
            qb.andWhere('i.status = :status', { status });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findOne(tenantId, id) {
        const i = await this.repo.findOne({ where: { id, tenantId } });
        if (!i)
            throw new common_1.NotFoundException('Incident not found');
        return i;
    }
    create(tenantId, userId, dto) {
        return this.repo.save(this.repo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async update(tenantId, id, dto) {
        await this.findOne(tenantId, id);
        await this.repo.update({ id, tenantId }, dto);
        return this.findOne(tenantId, id);
    }
    async close(tenantId, id) {
        await this.repo.update({ id, tenantId }, { status: incident_entity_1.IncidentStatus.CLOSED });
        return this.findOne(tenantId, id);
    }
    getStats(tenantId) {
        return this.repo.createQueryBuilder('i')
            .select('i.type', 'type').addSelect('i.severity', 'severity').addSelect('COUNT(*)', 'count')
            .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
            .groupBy('i.type, i.severity').getRawMany();
    }
};
exports.HseService = HseService;
exports.HseService = HseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(incident_entity_1.Incident)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HseService);
//# sourceMappingURL=hse.service.js.map