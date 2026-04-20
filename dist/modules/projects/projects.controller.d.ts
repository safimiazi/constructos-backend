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
    getTasks(u: JwtPayload, id: string): Promise<import("./entities/task.entity").Task[]>;
    createTask(u: JwtPayload, id: string, dto: any): Promise<import("./entities/task.entity").Task>;
    updateTask(u: JwtPayload, taskId: string, dto: any): Promise<import("./entities/task.entity").Task | null>;
    removeTask(u: JwtPayload, taskId: string): Promise<void>;
    getLogs(u: JwtPayload, id: string): Promise<import("./entities/daily-log.entity").DailyLog[]>;
    createLog(u: JwtPayload, id: string, dto: any): Promise<import("./entities/daily-log.entity").DailyLog>;
    getMilestones(u: JwtPayload, id: string): Promise<import("./entities/milestone.entity").Milestone[]>;
    createMilestone(u: JwtPayload, id: string, dto: any): Promise<import("./entities/milestone.entity").Milestone>;
    updateMilestone(u: JwtPayload, mid: string, dto: any): Promise<import("./entities/milestone.entity").Milestone | null>;
    removeMilestone(u: JwtPayload, mid: string): Promise<void>;
    getIssues(u: JwtPayload, id: string, q: any): Promise<import("./entities/issue.entity").Issue[]>;
    createIssue(u: JwtPayload, id: string, dto: any): Promise<import("./entities/issue.entity").Issue>;
    updateIssue(u: JwtPayload, iid: string, dto: any): Promise<import("./entities/issue.entity").Issue | null>;
}
