import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { DailyLog } from './entities/daily-log.entity';
import { Milestone } from './entities/milestone.entity';
import { Issue } from './entities/issue.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(DailyLog) private logRepo: Repository<DailyLog>,
    @InjectRepository(Milestone) private milestoneRepo: Repository<Milestone>,
    @InjectRepository(Issue) private issueRepo: Repository<Issue>,
  ) {}

  findAll(tenantId: string, query: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = query;
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

  // Tasks
  getTasks(tenantId: string, projectId: string) {
    return this.taskRepo.find({ where: { tenantId, projectId }, order: { createdAt: 'ASC' } });
  }

  async createTask(tenantId: string, projectId: string, userId: string, dto: Partial<Task>) {
    const t = this.taskRepo.create({ ...dto, tenantId, projectId, createdBy: userId });
    return this.taskRepo.save(t);
  }

  async updateTask(tenantId: string, taskId: string, dto: Partial<Task>) {
    await this.taskRepo.update({ id: taskId, tenantId }, dto);
    return this.taskRepo.findOne({ where: { id: taskId, tenantId } });
  }

  async removeTask(tenantId: string, taskId: string) {
    await this.taskRepo.softDelete({ id: taskId, tenantId });
  }

  // Daily logs
  getLogs(tenantId: string, projectId: string) {
    return this.logRepo.find({ where: { tenantId, projectId }, order: { date: 'DESC' } });
  }

  createLog(tenantId: string, projectId: string, userId: string, dto: Partial<DailyLog>) {
    const l = this.logRepo.create({ ...dto, tenantId, projectId, createdBy: userId });
    return this.logRepo.save(l);
  }

  // Milestones
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

  // Issues
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

  async getDashboard(tenantId: string) {
    const [total, active, completed, onHold] = await Promise.all([
      this.projectRepo.count({ where: { tenantId } }),
      this.projectRepo.count({ where: { tenantId, status: 'active' as any } }),
      this.projectRepo.count({ where: { tenantId, status: 'completed' as any } }),
      this.projectRepo.count({ where: { tenantId, status: 'on_hold' as any } }),
    ]);
    const recentProjects = await this.projectRepo.find({ where: { tenantId }, order: { createdAt: 'DESC' }, take: 5 });
    return { total, active, completed, onHold, recentProjects };
  }
}
