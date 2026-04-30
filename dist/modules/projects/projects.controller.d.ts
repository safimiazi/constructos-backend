import { ProjectsService } from './projects.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
export declare class ProjectsController {
    private readonly svc;
    constructor(svc: ProjectsService);
    getDashboard(u: JwtPayload): Promise<{
        total: number;
        active: number;
        completed: number;
        onHold: number;
        overdueCount: number;
        overdueMilestones: number;
        avgCompletion: number;
        totalBudget: any;
        recentProjects: import("./entities/project.entity").Project[];
    }>;
    findAll(u: JwtPayload, q: any): Promise<{
        data: import("./entities/project.entity").Project[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    create(u: JwtPayload, dto: any): Promise<import("./entities/project.entity").Project>;
    findOne(u: JwtPayload, id: string): Promise<import("./entities/project.entity").Project>;
    update(u: JwtPayload, id: string, dto: any): Promise<import("./entities/project.entity").Project>;
    remove(u: JwtPayload, id: string): Promise<void>;
    getTasks(u: JwtPayload, id: string): Promise<any[]>;
    createTask(u: JwtPayload, id: string, dto: any): Promise<import("./entities/task.entity").Task>;
    updateTask(u: JwtPayload, taskId: string, dto: any): Promise<import("./entities/task.entity").Task | null>;
    removeTask(u: JwtPayload, taskId: string): Promise<void>;
    getDeps(u: JwtPayload, taskId: string): Promise<import("./entities/task-dependency.entity").TaskDependency[]>;
    createDep(u: JwtPayload, taskId: string, dto: any): Promise<import("./entities/task-dependency.entity").TaskDependency>;
    removeDep(u: JwtPayload, depId: string): Promise<import("typeorm").UpdateResult>;
    getGantt(u: JwtPayload, id: string): Promise<{
        tasks: import("./entities/task.entity").Task[];
        dependencies: import("./entities/task-dependency.entity").TaskDependency[];
    }>;
    getLogs(u: JwtPayload, id: string): Promise<import("./entities/daily-log.entity").DailyLog[]>;
    createLog(u: JwtPayload, id: string, dto: any): Promise<import("./entities/daily-log.entity").DailyLog>;
    getMilestones(u: JwtPayload, id: string): Promise<import("./entities/milestone.entity").Milestone[]>;
    createMilestone(u: JwtPayload, id: string, dto: any): Promise<import("./entities/milestone.entity").Milestone>;
    updateMilestone(u: JwtPayload, mid: string, dto: any): Promise<import("./entities/milestone.entity").Milestone | null>;
    removeMilestone(u: JwtPayload, mid: string): Promise<void>;
    getIssues(u: JwtPayload, id: string, q: any): Promise<import("./entities/issue.entity").Issue[]>;
    createIssue(u: JwtPayload, id: string, dto: any): Promise<import("./entities/issue.entity").Issue>;
    updateIssue(u: JwtPayload, iid: string, dto: any): Promise<import("./entities/issue.entity").Issue | null>;
    getSubs(u: JwtPayload, id: string): Promise<import("./entities/subcontract.entity").Subcontract[]>;
    createSub(u: JwtPayload, id: string, dto: any): Promise<import("./entities/subcontract.entity").Subcontract>;
    updateSub(u: JwtPayload, sid: string, dto: any): Promise<import("./entities/subcontract.entity").Subcontract | null>;
    getRisks(u: JwtPayload, id: string): Promise<import("./entities/risk.entity").Risk[]>;
    createRisk(u: JwtPayload, id: string, dto: any): Promise<import("./entities/risk.entity").Risk>;
    updateRisk(u: JwtPayload, rid: string, dto: any): Promise<import("./entities/risk.entity").Risk | null>;
    getDefects(u: JwtPayload, id: string, q: any): Promise<import("./entities/defect.entity").Defect[]>;
    createDefect(u: JwtPayload, id: string, dto: any): Promise<import("./entities/defect.entity").Defect>;
    updateDefect(u: JwtPayload, did: string, dto: any): Promise<import("./entities/defect.entity").Defect | null>;
    removeDefect(u: JwtPayload, did: string): Promise<void>;
    getCostReport(u: JwtPayload, id: string): Promise<{
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
