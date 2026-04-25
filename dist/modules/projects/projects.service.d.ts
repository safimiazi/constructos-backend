import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { DailyLog } from './entities/daily-log.entity';
import { Milestone } from './entities/milestone.entity';
import { Issue } from './entities/issue.entity';
export declare class ProjectsService {
    private projectRepo;
    private taskRepo;
    private logRepo;
    private milestoneRepo;
    private issueRepo;
    constructor(projectRepo: Repository<Project>, taskRepo: Repository<Task>, logRepo: Repository<DailyLog>, milestoneRepo: Repository<Milestone>, issueRepo: Repository<Issue>);
    findAll(tenantId: string, query: {
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Project[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(tenantId: string, id: string): Promise<Project>;
    create(tenantId: string, userId: string, dto: Partial<Project>): Promise<Project>;
    update(tenantId: string, id: string, dto: Partial<Project>): Promise<Project>;
    remove(tenantId: string, id: string): Promise<void>;
    getTasks(tenantId: string, projectId: string): Promise<Task[]>;
    createTask(tenantId: string, projectId: string, userId: string, dto: Partial<Task>): Promise<Task>;
    updateTask(tenantId: string, taskId: string, dto: Partial<Task>): Promise<Task | null>;
    private recalcProjectCompletion;
    removeTask(tenantId: string, taskId: string): Promise<void>;
    getLogs(tenantId: string, projectId: string): Promise<DailyLog[]>;
    createLog(tenantId: string, projectId: string, userId: string, dto: Partial<DailyLog>): Promise<DailyLog>;
    getMilestones(tenantId: string, projectId: string): Promise<Milestone[]>;
    createMilestone(tenantId: string, projectId: string, userId: string, dto: Partial<Milestone>): Promise<Milestone>;
    updateMilestone(tenantId: string, id: string, dto: Partial<Milestone>): Promise<Milestone | null>;
    removeMilestone(tenantId: string, id: string): Promise<void>;
    getIssues(tenantId: string, projectId: string, q: {
        status?: string;
    }): Promise<Issue[]>;
    createIssue(tenantId: string, projectId: string, userId: string, dto: Partial<Issue>): Promise<Issue>;
    updateIssue(tenantId: string, id: string, dto: Partial<Issue>): Promise<Issue | null>;
    getDashboard(tenantId: string): Promise<{
        total: number;
        active: number;
        completed: number;
        onHold: number;
        overdueCount: number;
        avgCompletion: number;
        totalBudget: any;
        recentProjects: Project[];
    }>;
}
