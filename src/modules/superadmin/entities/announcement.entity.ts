import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';

export enum AnnouncementType { INFO = 'info', WARNING = 'warning', MAINTENANCE = 'maintenance' }

@Entity('announcements')
export class Announcement extends BaseEntity {
  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: AnnouncementType, default: AnnouncementType.INFO })
  type: AnnouncementType;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  @Column({ name: 'target_tenant_ids', type: 'jsonb', default: '[]' })
  targetTenantIds: string[]; // empty = all tenants
}
