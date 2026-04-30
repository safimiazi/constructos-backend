import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { DailyLog } from './entities/daily-log.entity';
import { Milestone } from './entities/milestone.entity';
import { Issue } from './entities/issue.entity';
import { TaskDependency } from './entities/task-dependency.entity';
import { Subcontract } from './entities/subcontract.entity';
import { Risk } from './entities/risk.entity';
import { Defect } from './entities/defect.entity';
export declare class ProjectsService {
    private projectRepo;
    private taskRepo;
    private logRepo;
    private milestoneRepo;
    private issueRepo;
    private depRepo;
    private subRepo;
    private riskRepo;
    private defectRepo;
    constructor(projectRepo: Repository<Project>, taskRepo: Repository<Task>, logRepo: Repository<DailyLog>, milestoneRepo: Repository<Milestone>, issueRepo: Repository<Issue>, depRepo: Repository<TaskDependency>, subRepo: Repository<Subcontract>, riskRepo: Repository<Risk>, defectRepo: Repository<Defect>);
    findAll(tenantId: string, q: {
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
    getTasks(tenantId: string, projectId: string): Promise<any[]>;
    createTask(tenantId: string, projectId: string, userId: string, dto: Partial<Task>): Promise<Task>;
    updateTask(tenantId: string, taskId: string, dto: Partial<Task>): Promise<Task | null>;
    removeTask(tenantId: string, taskId: string): Promise<void>;
    private recalcProjectCompletion;
    getTaskDependencies(tenantId: string, taskId: string): Promise<TaskDependency[]>;
    createDependency(tenantId: string, userId: string, dto: Partial<TaskDependency>): Promise<TaskDependency>;
    removeDependency(tenantId: string, id: string): Promise<import("typeorm").UpdateResult>;
    getGanttData(tenantId: string, projectId: string): Promise<{
        tasks: Task[];
        dependencies: TaskDependency[];
    }>;
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
    getSubcontracts(tenantId: string, projectId: string): Promise<Subcontract[]>;
    createSubcontract(tenantId: string, userId: string, dto: Partial<Subcontract>): Promise<Subcontract>;
    updateSubcontract(tenantId: string, id: string, dto: Partial<Subcontract>): Promise<Subcontract | null>;
    getRisks(tenantId: string, projectId: string): Promise<Risk[]>;
    createRisk(tenantId: string, userId: string, dto: Partial<Risk>): Promise<Risk>;
    updateRisk(tenantId: string, id: string, dto: Partial<Risk>): Promise<Risk | null>;
    getDashboard(tenantId: string): Promise<{
        total: number;
        active: number;
        completed: number;
        onHold: number;
        overdueCount: number;
        overdueMilestones: number;
        avgCompletion: number;
        totalBudget: any;
        recentProjects: Project[];
    }>;
    getDefects(tenantId: string, projectId: string, q: {
        status?: string;
    }): Promise<Defect[]>;
    createDefect(tenantId: string, projectId: string, userId: string, dto: Partial<Defect>): Promise<Defect>;
    updateDefect(tenantId: string, id: string, dto: Partial<Defect>): Promise<Defect | null>;
    removeDefect(tenantId: string, id: string): Promise<void>;
    getProjectCostReport(tenantId: string, projectId: string): Promise<{
        projectId: string;
        projectName: string;
        approvedBudget: number;
        budgetActual: number;
        vendorCommitted: number;
        vendorPaid: number;
        expenseTotal: number;
        totalCost: number;
        variance: number;
        completionPct: number;
    }>;
}
