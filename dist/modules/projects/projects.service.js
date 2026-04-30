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
const task_dependency_entity_1 = require("./entities/task-dependency.entity");
const subcontract_entity_1 = require("./entities/subcontract.entity");
const risk_entity_1 = require("./entities/risk.entity");
const defect_entity_1 = require("./entities/defect.entity");
let ProjectsService = class ProjectsService {
    projectRepo;
    taskRepo;
    logRepo;
    milestoneRepo;
    issueRepo;
    depRepo;
    subRepo;
    riskRepo;
    defectRepo;
    constructor(projectRepo, taskRepo, logRepo, milestoneRepo, issueRepo, depRepo, subRepo, riskRepo, defectRepo) {
        this.projectRepo = projectRepo;
        this.taskRepo = taskRepo;
        this.logRepo = logRepo;
        this.milestoneRepo = milestoneRepo;
        this.issueRepo = issueRepo;
        this.depRepo = depRepo;
        this.subRepo = subRepo;
        this.riskRepo = riskRepo;
        this.defectRepo = defectRepo;
    }
    findAll(tenantId, q) {
        const { status, page = 1, limit = 20 } = q;
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
    async getTasks(tenantId, projectId) {
        const tasks = await this.taskRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'ASC' } });
        const map = new Map(tasks.map(t => [t.id, { ...t, children: [] }]));
        const roots = [];
        for (const t of map.values()) {
            if (t.parentTaskId && map.has(t.parentTaskId)) {
                map.get(t.parentTaskId).children.push(t);
            }
            else {
                roots.push(t);
            }
        }
        return roots;
    }
    async createTask(tenantId, projectId, userId, dto) {
        let wbsCode = dto.wbsCode;
        if (!wbsCode) {
            if (dto.parentTaskId) {
                const parent = await this.taskRepo.findOne({ where: { id: dto.parentTaskId, tenantId } });
                const siblingCount = await this.taskRepo.count({ where: { tenantId, projectId, parentTaskId: dto.parentTaskId } });
                wbsCode = parent?.wbsCode ? `${parent.wbsCode}.${siblingCount + 1}` : `${siblingCount + 1}`;
            }
            else {
                const rootCount = await this.taskRepo.count({ where: { tenantId, projectId, parentTaskId: null } });
                wbsCode = String(rootCount + 1);
            }
        }
        const t = this.taskRepo.create({ ...dto, tenantId, projectId, wbsCode, createdBy: userId });
        const saved = await this.taskRepo.save(t);
        await this.recalcProjectCompletion(tenantId, projectId);
        return saved;
    }
    async updateTask(tenantId, taskId, dto) {
        await this.taskRepo.update({ id: taskId, tenantId }, dto);
        const task = await this.taskRepo.findOne({ where: { id: taskId, tenantId } });
        if (task && (dto.progressPct !== undefined || dto.status !== undefined)) {
            await this.recalcProjectCompletion(tenantId, task.projectId);
        }
        return task;
    }
    async removeTask(tenantId, taskId) {
        await this.taskRepo.softDelete({ id: taskId, tenantId });
    }
    async recalcProjectCompletion(tenantId, projectId) {
        const tasks = await this.taskRepo.find({ where: { tenantId, projectId } });
        if (!tasks.length) {
            return;
        }
        const avg = tasks.reduce((s, t) => {
            const pct = t.status === 'done' ? 100 : t.status === 'blocked' ? Number(t.progressPct) : Number(t.progressPct);
            return s + pct;
        }, 0) / tasks.length;
        await this.projectRepo.update({ id: projectId, tenantId }, { completionPercentage: Math.round(avg) });
    }
    getTaskDependencies(tenantId, taskId) {
        return this.depRepo.find({ where: { tenantId, taskId } });
    }
    createDependency(tenantId, userId, dto) {
        return this.depRepo.save(this.depRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    removeDependency(tenantId, id) {
        return this.depRepo.softDelete({ id, tenantId });
    }
    async getGanttData(tenantId, projectId) {
        const [tasks, deps] = await Promise.all([
            this.taskRepo.find({ where: { tenantId, projectId }, order: { startDate: 'ASC' } }),
            this.depRepo.find({ where: { tenantId } }),
        ]);
        return { tasks, dependencies: deps.filter(d => tasks.some(t => t.id === d.taskId)) };
    }
    getLogs(tenantId, projectId) {
        return this.logRepo.find({ where: { tenantId, projectId }, order: { date: 'DESC' } });
    }
    async createLog(tenantId, projectId, userId, dto) {
        const l = this.logRepo.create({ ...dto, tenantId, projectId, createdBy: userId });
        const saved = await this.logRepo.save(l);
        await this.recalcProjectCompletion(tenantId, projectId);
        return saved;
    }
    async getMilestones(tenantId, projectId) {
        const milestones = await this.milestoneRepo.find({ where: { tenantId, projectId }, order: { dueDate: 'ASC' } });
        const today = new Date();
        const toUpdate = milestones.filter(m => m.status === 'pending' && m.dueDate && new Date(m.dueDate) < today);
        if (toUpdate.length > 0) {
            await Promise.all(toUpdate.map(m => this.milestoneRepo.update({ id: m.id }, { status: 'overdue' })));
            toUpdate.forEach(m => { m.status = 'overdue'; });
        }
        return milestones;
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
    getSubcontracts(tenantId, projectId) {
        return this.subRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'DESC' } });
    }
    createSubcontract(tenantId, userId, dto) {
        return this.subRepo.save(this.subRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateSubcontract(tenantId, id, dto) {
        await this.subRepo.update({ id, tenantId }, dto);
        return this.subRepo.findOne({ where: { id, tenantId } });
    }
    getRisks(tenantId, projectId) {
        return this.riskRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'DESC' } });
    }
    createRisk(tenantId, userId, dto) {
        return this.riskRepo.save(this.riskRepo.create({ ...dto, tenantId, createdBy: userId }));
    }
    async updateRisk(tenantId, id, dto) {
        await this.riskRepo.update({ id, tenantId }, dto);
        return this.riskRepo.findOne({ where: { id, tenantId } });
    }
    async getDashboard(tenantId) {
        const [total, active, completed, onHold] = await Promise.all([
            this.projectRepo.count({ where: { tenantId } }),
            this.projectRepo.count({ where: { tenantId, status: 'active' } }),
            this.projectRepo.count({ where: { tenantId, status: 'completed' } }),
            this.projectRepo.count({ where: { tenantId, status: 'on_hold' } }),
        ]);
        const overdueCount = await this.projectRepo.createQueryBuilder('p')
            .where('p.tenant_id = :tenantId AND p.end_date < NOW() AND p.status NOT IN (:...statuses) AND p.deleted_at IS NULL', { tenantId, statuses: ['completed', 'cancelled'] })
            .getCount();
        const overdueMilestones = await this.milestoneRepo.createQueryBuilder('m')
            .where('m.tenant_id = :tenantId AND m.due_date < NOW() AND m.status = :s', { tenantId, s: 'pending' })
            .getCount();
        const budgetStats = await this.projectRepo.createQueryBuilder('p')
            .select('SUM(p.budget_amount)', 'totalBudget').addSelect('AVG(p.completion_percentage)', 'avgCompletion')
            .where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId }).getRawOne();
        const recentProjects = await this.projectRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' }, take: 5 });
        return { total, active, completed, onHold, overdueCount, overdueMilestones, avgCompletion: Math.round(Number(budgetStats?.avgCompletion ?? 0)), totalBudget: budgetStats?.totalBudget ?? 0, recentProjects };
    }
    getDefects(tenantId, projectId, q) {
        const qb = this.defectRepo.createQueryBuilder('d')
            .where('d.tenant_id = :tenantId AND d.project_id = :projectId AND d.deleted_at IS NULL', { tenantId, projectId })
            .orderBy('d.created_at', 'DESC');
        if (q.status)
            qb.andWhere('d.status = :status', { status: q.status });
        return qb.getMany();
    }
    createDefect(tenantId, projectId, userId, dto) {
        return this.defectRepo.save(this.defectRepo.create({ ...dto, tenantId, projectId, createdBy: userId }));
    }
    async updateDefect(tenantId, id, dto) {
        if (dto.status === 'resolved' || dto.status === 'closed') {
            dto.resolvedAt = new Date();
        }
        await this.defectRepo.update({ id, tenantId }, dto);
        return this.defectRepo.findOne({ where: { id, tenantId } });
    }
    async removeDefect(tenantId, id) {
        await this.defectRepo.softDelete({ id, tenantId });
    }
    async getProjectCostReport(tenantId, projectId) {
        const [project, budgetSummary, vendorInvoices, expenses] = await Promise.all([
            this.projectRepo.findOne({ where: { id: projectId, tenantId } }),
            this.projectRepo.manager.query(`SELECT COALESCE(SUM(budget_amount),0) as budget, COALESCE(SUM(actual_amount),0) as actual FROM budgets WHERE tenant_id=$1 AND project_id=$2 AND deleted_at IS NULL`, [tenantId, projectId]),
            this.projectRepo.manager.query(`SELECT COALESCE(SUM(total_amount),0) as committed, COALESCE(SUM(paid_amount),0) as paid FROM invoices WHERE tenant_id=$1 AND project_id=$2 AND type='vendor' AND status NOT IN ('cancelled','draft') AND deleted_at IS NULL`, [tenantId, projectId]),
            this.projectRepo.manager.query(`SELECT COALESCE(SUM(amount),0) as total FROM expense_claims WHERE tenant_id=$1 AND project_id=$2 AND status='approved' AND deleted_at IS NULL`, [tenantId, projectId]),
        ]);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const approvedBudget = Number(project.budgetAmount);
        const budgetActual = Number(budgetSummary[0]?.actual ?? 0);
        const vendorCommitted = Number(vendorInvoices[0]?.committed ?? 0);
        const vendorPaid = Number(vendorInvoices[0]?.paid ?? 0);
        const expenseTotal = Number(expenses[0]?.total ?? 0);
        const totalCost = vendorPaid + expenseTotal;
        return {
            projectId,
            projectName: project.name,
            approvedBudget,
            budgetActual,
            vendorCommitted,
            vendorPaid,
            expenseTotal,
            totalCost,
            variance: approvedBudget - totalCost,
            completionPct: Number(project.completionPercentage),
        };
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
    __param(5, (0, typeorm_1.InjectRepository)(task_dependency_entity_1.TaskDependency)),
    __param(6, (0, typeorm_1.InjectRepository)(subcontract_entity_1.Subcontract)),
    __param(7, (0, typeorm_1.InjectRepository)(risk_entity_1.Risk)),
    __param(8, (0, typeorm_1.InjectRepository)(defect_entity_1.Defect)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map