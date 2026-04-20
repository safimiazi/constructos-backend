import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum JobStatus { OPEN = 'open', CLOSED = 'closed', ON_HOLD = 'on_hold' }
export enum ApplicantStage { APPLIED = 'applied', SCREENING = 'screening', INTERVIEW = 'interview', OFFERED = 'offered', HIRED = 'hired', REJECTED = 'rejected' }

@Entity('job_postings')
export class JobPosting extends TenantBaseEntity {
  @Column({ length: 200 })
  title: string;

  @Column({ name: 'department_id', type: 'uuid', nullable: true })
  departmentId: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: JobStatus, default: JobStatus.OPEN })
  status: JobStatus;

  @Column({ type: 'date', nullable: true })
  deadline: Date | null;

  @Column({ name: 'vacancies', type: 'int', default: 1 })
  vacancies: number;
}

@Entity('applicants')
export class Applicant extends TenantBaseEntity {
  @Column({ name: 'job_id', type: 'uuid' })
  jobId: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200 })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ name: 'cv_url', type: 'varchar', nullable: true })
  cvUrl: string | null;

  @Column({ type: 'enum', enum: ApplicantStage, default: ApplicantStage.APPLIED })
  stage: ApplicantStage;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
