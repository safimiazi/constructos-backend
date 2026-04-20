import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum JobStatus {
    OPEN = "open",
    CLOSED = "closed",
    ON_HOLD = "on_hold"
}
export declare enum ApplicantStage {
    APPLIED = "applied",
    SCREENING = "screening",
    INTERVIEW = "interview",
    OFFERED = "offered",
    HIRED = "hired",
    REJECTED = "rejected"
}
export declare class JobPosting extends TenantBaseEntity {
    title: string;
    departmentId: string | null;
    description: string | null;
    status: JobStatus;
    deadline: Date | null;
    vacancies: number;
}
export declare class Applicant extends TenantBaseEntity {
    jobId: string;
    name: string;
    email: string;
    phone: string | null;
    cvUrl: string | null;
    stage: ApplicantStage;
    notes: string | null;
}
