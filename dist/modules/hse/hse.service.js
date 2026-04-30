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
const ptw_entity_1 = require("./entities/ptw.entity");
let HseService = class HseService {
    incidentRepo;
    ptwRepo;
    checklistRepo;
    constructor(incidentRepo, ptwRepo, checklistRepo) {
        this.incidentRepo = incidentRepo;
        this.ptwRepo = ptwRepo;
        this.checklistRepo = checklistRepo;
    }
    findAll(tenantId, q) {
        const { projectId, status, page = 1, limit = 20 } = q;
        const qb = this.incidentRepo.createQueryBuilder('i')
            .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
            .orderBy('i.incident_date', 'DESC').skip((page - 1) * limit).take(limit);
        if (projectId)
            qb.andWhere('i.project_id = :projectId', { projectId });
        if (status)
            qb.andWhere('i.status = :status', { status });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findOne(tenantId, id) {
        const i = await this.incidentRepo.findOne({ where: { id, tenantId } });
        if (!i)
            throw new common_1.NotFoundException('Incident not found');
        return i;
    }
    create(tenantId, userId, dto) { return this.incidentRepo.save(this.incidentRepo.create({ ...dto, tenantId, createdBy: userId })); }
    async update(tenantId, id, dto) { await this.findOne(tenantId, id); await this.incidentRepo.update({ id, tenantId }, dto); return this.findOne(tenantId, id); }
    async close(tenantId, id) { await this.incidentRepo.update({ id, tenantId }, { status: incident_entity_1.IncidentStatus.CLOSED }); return this.findOne(tenantId, id); }
    getStats(tenantId) {
        return this.incidentRepo.createQueryBuilder('i')
            .select('i.type', 'type').addSelect('i.severity', 'severity').addSelect('COUNT(*)', 'count')
            .where('i.tenant_id = :tenantId AND i.deleted_at IS NULL', { tenantId })
            .groupBy('i.type, i.severity').getRawMany();
    }
    getHSEDashboard(tenantId) {
        return Promise.all([
            this.incidentRepo.count({ where: { tenantId, status: incident_entity_1.IncidentStatus.OPEN } }),
            this.incidentRepo.count({ where: { tenantId } }),
            this.ptwRepo.count({ where: { tenantId, status: ptw_entity_1.PTWStatus.ACTIVE } }),
            this.checklistRepo.count({ where: { tenantId } }),
        ]).then(([openIncidents, totalIncidents, activePTW, totalChecklists]) => ({
            openIncidents, totalIncidents, activePTW, totalChecklists,
        }));
    }
    findPTWs(tenantId, q) {
        const qb = this.ptwRepo.createQueryBuilder('p').where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId }).orderBy('p.valid_from', 'DESC');
        if (q.projectId)
            qb.andWhere('p.project_id = :projectId', { projectId: q.projectId });
        if (q.status)
            qb.andWhere('p.status = :status', { status: q.status });
        return qb.getMany();
    }
    createPTW(tenantId, userId, dto) { return this.ptwRepo.save(this.ptwRepo.create({ ...dto, tenantId, issuedBy: userId, createdBy: userId })); }
    async updatePTW(tenantId, id, dto) { await this.ptwRepo.update({ id, tenantId }, dto); return this.ptwRepo.findOne({ where: { id, tenantId } }); }
    async closePTW(tenantId, id) { await this.ptwRepo.update({ id, tenantId }, { status: ptw_entity_1.PTWStatus.CLOSED }); return this.ptwRepo.findOne({ where: { id, tenantId } }); }
    findChecklists(tenantId, projectId) {
        const where = { tenantId };
        if (projectId)
            where.projectId = projectId;
        return this.checklistRepo.find({ where, order: { date: 'DESC' } });
    }
    createChecklist(tenantId, userId, dto) { return this.checklistRepo.save(this.checklistRepo.create({ ...dto, tenantId, conductedBy: userId, createdBy: userId })); }
    async submitChecklist(tenantId, id, responses) {
        const score = Math.round(responses.filter(r => r.answer).length / responses.length * 100);
        await this.checklistRepo.update({ id, tenantId }, { items: responses, score, status: 'completed' });
        return this.checklistRepo.findOne({ where: { id, tenantId } });
    }
};
exports.HseService = HseService;
exports.HseService = HseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(incident_entity_1.Incident)),
    __param(1, (0, typeorm_1.InjectRepository)(ptw_entity_1.PermitToWork)),
    __param(2, (0, typeorm_1.InjectRepository)(ptw_entity_1.SafetyChecklist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HseService);
//# sourceMappingURL=hse.service.js.map