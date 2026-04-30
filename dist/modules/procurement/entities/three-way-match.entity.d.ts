import { TenantBaseEntity } from '../../../database/base.entity';
export declare enum MatchStatus {
    PENDING = "pending",
    MATCHED = "matched",
    DISCREPANCY = "discrepancy"
}
export declare class ThreeWayMatch extends TenantBaseEntity {
    poId: string;
    grnId: string;
    invoiceId: string;
    status: MatchStatus;
    poAmount: number;
    grnAmount: number;
    invoiceAmount: number;
    discrepancyNotes: string | null;
}
