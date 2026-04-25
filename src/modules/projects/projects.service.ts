import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { DailyLog } from './entities/daily-log.entity';
import { Milestone } from './entities/milestone.entity';
import { Issue } from './entities/issue.entity';
import { TaskDependency } from './entities/task-dependency.entity';
import { Subcontract } from './entities/subcontract.entity';
import { Risk } from './entities/risk.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(DailyLog) private logRepo: Repository<DailyLog>,
    @InjectRepository(Milestone) private milestoneRepo: Repository<Milestone>,
    @InjectRepository(Issue) private issueRepo: Repository<Issue>,
    @InjectRepository(TaskDependency) private depRepo: Repository<TaskDependency>,
    @InjectRepository(Subcontract) private subRepo: Repository<Subcontract>,
    @InjectRepository(Risk) private riskRepo: Repository<Risk>,
  ) {}

  // ── Projects ───────────────────────────────────────────────────────────────

  findAll(tenantId: string, q: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = q;
    const qb = this.projectRepo.createQueryBuilder('p')
      .where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId })
      .orderBy('p.created_at', 'DESC').skip((page - 1) * limit).take(limit);
    if (status) qb.andWhere('p.status = :status', { status });
    return qb.getManyAndCount().then(([data, total]) => ({ data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }));
  }

  async findOne(tenantId: string, id: string) {
    const p = await this.projectRepo.findOne({ where: { id, tenantId } });
    if (!p) throw new NotFoundException('Project not found');
    return p;
  }

  async create(tenantId: string, userId: string, dto: Partial<Project>) {
    const count = await this.projectRepo.count({ where: { tenantId } });
    const code = `PRJ-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    const p = this.projectRepo.create({ ...dto, tenantId, createdBy: userId, contractNumber: (dto as any).contractNumber ?? code });
    return this.projectRepo.save(p);
  }

  async update(tenantId: string, id: string, dto: Partial<Project>) {
    await this.findOne(tenantId, id);
    await this.projectRepo.update({ id, tenantId }, dto);
    return this.findOne(tenantId, id);
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    await this.projectRepo.softDelete({ id, tenantId });
  }

  // ── Tasks ──────────────────────────────────────────────────────────────────

  async getTasks(tenantId: string, projectId: string) {
    const tasks = await this.taskRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'ASC' } });
    // Build WBS tree
    const map = new Map(tasks.map(t => [t.id, { ...t, children: [] as any[] }]));
    const roots: any[] = [];
    for (const t of map.values()) {
      if (t.parentTaskId && map.has(t.parentTaskId)) {
        map.get(t.parentTaskId)!.children.push(t);
      } else {
        roots.push(t);
      }
    }
    return roots;
  }

  async createTask(tenantId: string, projectId: string, userId: string, dto: Partial<Task>) {
    const t = this.taskRepo.create({ ...dto, tenantId, projectId, createdBy: userId });
    const saved = await this.taskRepo.save(t);
    await this.recalcProjectCompletion(tenantId, projectId);
    return saved;
  }

  async updateTask(tenantId: string, taskId: string, dto: Partial<Task>) {
    await this.taskRepo.update({ id: taskId, tenantId }, dto);
    const task = await this.taskRepo.findOne({ where: { id: taskId, tenantId } });
    if (task && (dto.progressPct !== undefined || dto.status !== undefined)) {
      await this.recalcProjectCompletion(tenantId, task.projectId);
    }
    return task;
  }

  async removeTask(tenantId: string, taskId: string) {
    await this.taskRepo.softDelete({ id: taskId, tenantId });
  }

  private async recalcProjectCompletion(tenantId: string, projectId: string) {
    const tasks = await this.taskRepo.find({ where: { tenantId, projectId } });
    if (!tasks.length) return;
    const avg = tasks.reduce((s, t) => {
      const pct = t.status === 'done' ? 100 : t.status === 'blocked' ? 0 : Number(t.progressPct);
      return s + pct;
    }, 0) / tasks.length;
    await this.projectRepo.update({ id: projectId, tenantId }, { completionPercentage: Math.round(avg) });
  }

  // ── Task Dependencies ──────────────────────────────────────────────────────

  getTaskDependencies(tenantId: string, taskId: string) {
    return this.depRepo.find({ where: { tenantId, taskId } });
  }

  createDependency(tenantId: string, userId: string, dto: Partial<TaskDependency>) {
    return this.depRepo.save(this.depRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  removeDependency(tenantId: string, id: string) {
    return this.depRepo.softDelete({ id, tenantId });
  }

  // ── Gantt data ─────────────────────────────────────────────────────────────

  async getGanttData(tenantId: string, projectId: string) {
    const [tasks, deps] = await Promise.all([
      this.taskRepo.find({ where: { tenantId, projectId }, order: { startDate: 'ASC' } }),
      this.depRepo.find({ where: { tenantId } }),
    ]);
    return { tasks, dependencies: deps.filter(d => tasks.some(t => t.id === d.taskId)) };
  }

  // ── Daily logs ─────────────────────────────────────────────────────────────

  getLogs(tenantId: string, projectId: string) {
    return this.logRepo.find({ where: { tenantId, projectId }, order: { date: 'DESC' } });
  }

  async createLog(tenantId: string, projectId: string, userId: string, dto: Partial<DailyLog>) {
    const l = this.logRepo.create({ ...dto, tenantId, projectId, createdBy: userId });
    const saved = await this.logRepo.save(l);
    if (dto.progressPct !== undefined) {
      await this.projectRepo.update({ id: projectId, tenantId }, { completionPercentage: Number(dto.progressPct) });
    }
    return saved;
  }

  // ── Milestones ─────────────────────────────────────────────────────────────

  getMilestones(tenantId: string, projectId: string) {
    return this.milestoneRepo.find({ where: { tenantId, projectId }, order: { dueDate: 'ASC' } });
  }

  createMilestone(tenantId: string, projectId: string, userId: string, dto: Partial<Milestone>) {
    return this.milestoneRepo.save(this.milestoneRepo.create({ ...dto, tenantId, projectId, createdBy: userId }));
  }

  async updateMilestone(tenantId: string, id: string, dto: Partial<Milestone>) {
    await this.milestoneRepo.update({ id, tenantId }, dto);
    return this.milestoneRepo.findOne({ where: { id, tenantId } });
  }

  async removeMilestone(tenantId: string, id: string) {
    await this.milestoneRepo.softDelete({ id, tenantId });
  }

  // ── Issues ─────────────────────────────────────────────────────────────────

  getIssues(tenantId: string, projectId: string, q: { status?: string }) {
    const qb = this.issueRepo.createQueryBuilder('i')
      .where('i.tenant_id = :tenantId AND i.project_id = :projectId AND i.deleted_at IS NULL', { tenantId, projectId })
      .orderBy('i.created_at', 'DESC');
    if (q.status) qb.andWhere('i.status = :status', { status: q.status });
    return qb.getMany();
  }

  createIssue(tenantId: string, projectId: string, userId: string, dto: Partial<Issue>) {
    return this.issueRepo.save(this.issueRepo.create({ ...dto, tenantId, projectId, createdBy: userId }));
  }

  async updateIssue(tenantId: string, id: string, dto: Partial<Issue>) {
    await this.issueRepo.update({ id, tenantId }, dto);
    return this.issueRepo.findOne({ where: { id, tenantId } });
  }

  // ── Subcontracts ───────────────────────────────────────────────────────────

  getSubcontracts(tenantId: string, projectId: string) {
    return this.subRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'DESC' } });
  }

  createSubcontract(tenantId: string, userId: string, dto: Partial<Subcontract>) {
    return this.subRepo.save(this.subRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateSubcontract(tenantId: string, id: string, dto: Partial<Subcontract>) {
    await this.subRepo.update({ id, tenantId }, dto);
    return this.subRepo.findOne({ where: { id, tenantId } });
  }

  // ── Risks ──────────────────────────────────────────────────────────────────

  getRisks(tenantId: string, projectId: string) {
    return this.riskRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'DESC' } });
  }

  createRisk(tenantId: string, userId: string, dto: Partial<Risk>) {
    return this.riskRepo.save(this.riskRepo.create({ ...dto, tenantId, createdBy: userId }));
  }

  async updateRisk(tenantId: string, id: string, dto: Partial<Risk>) {
    await this.riskRepo.update({ id, tenantId }, dto);
    return this.riskRepo.findOne({ where: { id, tenantId } });
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────

  async getDashboard(tenantId: string) {
    const [total, active, completed, onHold] = await Promise.all([
      this.projectRepo.count({ where: { tenantId } }),
      this.projectRepo.count({ where: { tenantId, status: 'active' as any } }),
      this.projectRepo.count({ where: { tenantId, status: 'completed' as any } }),
      this.projectRepo.count({ where: { tenantId, status: 'on_hold' as any } }),
    ]);
    const overdueCount = await this.projectRepo.createQueryBuilder('p')
      .where('p.tenant_id = :tenantId AND p.end_date < NOW() AND p.status NOT IN (:...statuses) AND p.deleted_at IS NULL', { tenantId, statuses: ['completed', 'cancelled'] })
      .getCount();
    const budgetStats = await this.projectRepo.createQueryBuilder('p')
      .select('SUM(p.budget_amount)', 'totalBudget').addSelect('AVG(p.completion_percentage)', 'avgCompletion')
      .where('p.tenant_id = :tenantId AND p.deleted_at IS NULL', { tenantId }).getRawOne();
    const recentProjects = await this.projectRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' }, take: 5 });
    return { total, active, completed, onHold, overdueCount, avgCompletion: Math.round(Number(budgetStats?.avgCompletion ?? 0)), totalBudget: budgetStats?.totalBudget ?? 0, recentProjects };
  }
}
