import { Entity, Column } from 'typeorm';
import { TenantBaseEntity } from '../../../database/base.entity';

export enum ProposalStatus { DRAFT = 'draft', SENT = 'sent', ACCEPTED = 'accepted', REJECTED = 'rejected' }
export enum ContractStatus { DRAFT = 'draft', ACTIVE = 'active', COMPLETED = 'completed', TERMINATED = 'terminated' }

@Entity('proposals')
export class Proposal extends TenantBaseEntity {
  @Column({ name: 'lead_id', type: 'uuid', nullable: true })
  leadId: string | null;

  @Column({ name: 'client_id', type: 'uuid', nullable: true })
  clientId: string | null;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'jsonb', default: '[]' })
  items: { description: string; quantity: number; unitPrice: number; amount: number }[];

  @Column({ name: 'total_value', type: 'numeric', precision: 15, scale: 2, default: 0 })
  totalValue: number;

  @Column({ type: 'enum', enum: ProposalStatus, default: ProposalStatus.DRAFT })
  status: ProposalStatus;

  @Column({ name: 'valid_until', type: 'date', nullable: true })
  validUntil: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}

@Entity('contracts')
export class Contract extends TenantBaseEntity {
  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'project_id', type: 'uuid', nullable: true })
  projectId: string | null;

  @Column({ name: 'proposal_id', type: 'uuid', nullable: true })
  proposalId: string | null;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  value: number;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date | null;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ type: 'enum', enum: ContractStatus, default: ContractStatus.DRAFT })
  status: ContractStatus;

  @Column({ name: 'signed_doc_url', type: 'varchar', nullable: true })
  signedDocUrl: string | null;

  @Column({ name: 'e_signed_at', type: 'timestamptz', nullable: true })
  eSignedAt: Date | null;
}
