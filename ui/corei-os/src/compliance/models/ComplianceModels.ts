// src/compliance/models/ComplianceModels.ts
/**
 * COREI – Compliance Domain Models
 * Stage-25 / Phase-25
 */
export interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'review';
  owner: string;
  implemented: boolean;
}

export interface ComplianceObligation {
  id: string;
  name: string;
  description: string;
  regulation: string;
  status: 'pending' | 'compliant' | 'non-compliant' | 'exempt';
  dueDate?: string;
  assignedTo: string;
}

export interface ComplianceEvidence {
  id: string;
  name: string;
  description: string;
  controlId?: string;
  obligationId?: string;
  status: 'pending' | 'collected' | 'verified' | 'rejected';
  collectedBy: string;
  collectedAt: number;
  location?: string;
}

export interface ComplianceException {
  id: string;
  name: string;
  description: string;
  controlId?: string;
  obligationId?: string;
  status: 'open' | 'under-review' | 'approved' | 'rejected' | 'closed';
  raisedBy: string;
  raisedAt: number;
  approvedBy?: string;
  approvedAt?: number;
}

export interface ComplianceMonitoring {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'continuous';
  lastRun: number;
  nextRun: number;
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  results: any;
}

export interface ComplianceReport {
  id: string;
  name: string;
  description: string;
  type: string;
  generatedAt: number;
  status: 'draft' | 'generated' | 'published' | 'archived';
  data: any;
}

export interface ComplianceContext {
  controls: ComplianceControl[];
  obligations: ComplianceObligation[];
  evidence: ComplianceEvidence[];
  exceptions: ComplianceException[];
  monitoring: ComplianceMonitoring[];
  reports: ComplianceReport[];
  workspaceId: string | null;
}
