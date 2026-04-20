import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum DocumentStatus { DRAFT = 'draft', UNDER_REVIEW = 'under_review', APPROVED = 'approved', REJECTED = 'rejected' }

@Entity('documents')
export class Document extends TenantBaseEntity {
  @Column({ length: 300 })
  name: string;

  @Column({ name: 'file_url', type: 'varchar' })
  fileUrl: string;

  @Column({ name: 'file_size', type: 'int', default: 0 })
  fileSize: number;

  @Column({ name: 'mime_type', type: 'varchar', nullable: true })
  mimeType: string | null;

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ name: 'folder', type: 'varchar', nullable: true })
  folder: string | null;

  @Column({ type: 'enum', enum: DocumentStatus, default: DocumentStatus.DRAFT })
  status: DocumentStatus;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
