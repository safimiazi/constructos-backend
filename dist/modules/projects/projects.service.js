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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const task_entity_1 = require("./entities/task.entity");
const daily_log_entity_1 = require("./entities/daily-log.entity");
const milestone_entity_1 = require("./entities/milestone.entity");
const issue_entity_1 = require("./entities/issue.entity");
let ProjectsService = class ProjectsService {
    projectRepo;
    taskRepo;
    logRepo;
    milestoneRepo;
    issueRepo;
    constructor(projectRepo, taskRepo, logRepo, milestoneRepo, issueRepo) {
        this.projectRepo = projectRepo;
        this.taskRepo = taskRepo;
        this.logRepo = logRepo;
        this.milestoneRepo = milestoneRepo;
        this.issueRepo = issueRepo;
    }
    findAll(tenantId, query) {
        const { status, page = 1, limit = 20 } = query;
        const qb = this.projectRepo.createQueryBuilder('p')
            .where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId })
            .orderBy('p.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        if (status)
            qb.andWhere('p.status = :status', { status });
        return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
    }
    async findOne(tenantId, id) {
        const p = await this.projectRepo.findOne({ where: { id, tenantId } });
        if (!p)
            throw new common_1.NotFoundException('Project not found');
        return p;
    }
    async create(tenantId, userId, dto) {
        const count = await this.projectRepo.count({ where: { tenantId } });
        const code = `PRJ-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
        const p = this.projectRepo.create({ ...dto, tenantId, createdBy: userId, contractNumber: dto.contractNumber ?? code });
        return this.projectRepo.save(p);
    }
    async update(tenantId, id, dto) {
        await this.findOne(tenantId, id);
        await this.projectRepo.update({ id, tenantId }, dto);
        return this.findOne(tenantId, id);
    }
    async remove(tenantId, id) {
        await this.findOne(tenantId, id);
        await this.projectRepo.softDelete({ id, tenantId });
    }
    getTasks(tenantId, projectId) {
        return this.taskRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'ASC' } });
    }
    async createTask(tenantId, projectId, userId, dto) {
        const t = this.taskRepo.create({ ...dto, tenantId, projectId, createdBy: userId });
        return this.taskRepo.save(t);
    }
    async updateTask(tenantId, taskId, dto) {
        await this.taskRepo.update({ id: taskId, tenantId }, dto);
        const task = await this.taskRepo.findOne({ where: { id: taskId, tenantId } });
        if (task && (dto.progressPct !== undefined || dto.status !== undefined)) {
            await this.recalcProjectCompletion(tenantId, task.projectId);
        }
        return task;
    }
    async recalcProjectCompletion(tenantId, projectId) {
        const tasks = await this.taskRepo.find({ where: { tenantId, projectId } });
        if (!tasks.length)
            return;
        const avg = tasks.reduce((s, t) => {
            const pct = t.status === 'done' ? 100 : t.status === 'blocked' ? 0 : Number(t.progressPct);
            return s + pct;
        }, 0) / tasks.length;
        await this.projectRepo.update({ id: projectId, tenantId }, { completionPercentage: Math.round(avg) });
    }
    async removeTask(tenantId, taskId) {
        await this.taskRepo.softDelete({ id: taskId, tenantId });
    }
    getLogs(tenantId, projectId) {
        return this.logRepo.find({ where: { tenantId, projectId }, order: { date: 'DESC' } });
    }
    async createLog(tenantId, projectId, userId, dto) {
        const l = this.logRepo.create({ ...dto, tenantId, projectId, createdBy: userId });
        const saved = await this.logRepo.save(l);
        if (dto.progressPct !== undefined) {
            await this.projectRepo.update({ id: projectId, tenantId }, { completionPercentage: Number(dto.progressPct) });
        }
        return saved;
    }
    getMilestones(tenantId, projectId) {
        return this.milestoneRepo.find({ where: { tenantId, projectId }, order: { dueDate: 'ASC' } });
    }
    createMilestone(tenantId, projectId, userId, dto) {
        return this.milestoneRepo.save(this.milestoneRepo.create({ ...dto, tenantId, projectId, createdBy: userId }));
    }
    async updateMilestone(tenantId, id, dto) {
        await this.milestoneRepo.update({ id, tenantId }, dto);
        return this.milestoneRepo.findOne({ where: { id, tenantId } });
    }
    async removeMilestone(tenantId, id) {
        await this.milestoneRepo.softDelete({ id, tenantId });
    }
    getIssues(tenantId, projectId, q) {
        const qb = this.issueRepo.createQueryBuilder('i')
            .where('i.tenant_id = :tenantId AND i.project_id = :projectId AND i.deleted_at IS NULL', { tenantId, projectId })
            .orderBy('i.created_at', 'DESC');
        if (q.status)
            qb.andWhere('i.status = :status', { status: q.status });
        return qb.getMany();
    }
    createIssue(tenantId, projectId, userId, dto) {
        return this.issueRepo.save(this.issueRepo.create({ ...dto, tenantId, projectId, createdBy: userId }));
    }
    async updateIssue(tenantId, id, dto) {
        await this.issueRepo.update({ id, tenantId }, dto);
        return this.issueRepo.findOne({ where: { id, tenantId } });
    }
    async getDashboard(tenantId) {
        const [total, active, completed, onHold] = await Promise.all([
            this.projectRepo.count({ where: { tenantId } }),
            this.projectRepo.count({ where: { tenantId, status: 'active' } }),
            this.projectRepo.count({ where: { tenantId, status: 'completed' } }),
            this.projectRepo.count({ where: { tenantId, status: 'on_hold' } }),
        ]);
        const recentProjects = await this.projectRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' }, take: 5 });
        const budgetStats = await this.projectRepo.createQueryBuilder('p')
            .select('SUM(p.budget_amount)', 'totalBudget')
            .addSelect('SUM(p.completion_percentage)', 'totalCompletion')
            .addSelect('COUNT(*)', 'count')
            .where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId })
            .getRawOne();
        const overdueCount = await this.projectRepo.createQueryBuilder('p')
            .where('p.tenant_id = :tenantId AND p.end_date < NOW() AND p.status NOT IN (:...statuses) AND p.deleted_at IS NULL', { tenantId, statuses: ['completed', 'cancelled'] })
            .getCount();
        const avgCompletion = budgetStats?.count > 0 ? Math.round(Number(budgetStats.totalCompletion) / Number(budgetStats.count)) : 0;
        return { total, active, completed, onHold, overdueCount, avgCompletion, totalBudget: budgetStats?.totalBudget ?? 0, recentProjects };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(2, (0, typeorm_1.InjectRepository)(daily_log_entity_1.DailyLog)),
    __param(3, (0, typeorm_1.InjectRepository)(milestone_entity_1.Milestone)),
    __param(4, (0, typeorm_1.InjectRepository)(issue_entity_1.Issue)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map