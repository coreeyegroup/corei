// src/governance/models/GovernanceModels.ts
/**
 * COREI – Governance Domain Models
 * Stage-25 / Phase-24
 */
export interface GovernancePolicy {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  effectiveDate: string;
  expiryDate?: string;
  metadata: Record<string, any>;
}

export interface GovernanceDecision {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'deferred';
  decisionMaker: string;
  timestamp: number;
  rationale?: string;
}

export interface GovernanceApproval {
  id: string;
  requestId: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
  comments?: string;
}

export interface GovernanceWorkflow {
  id: string;
  type: string;
  state: 'initiated' | 'in-review' | 'pending-decision' | 'approved' | 'rejected' | 'closed';
  initiator: string;
  createdAt: number;
  updatedAt: number;
  metadata: Record<string, any>;
}

export interface GovernanceCompliance {
  id: string;
  regulation: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  evidence: string[];
  lastAudit: number;
}

export interface GovernanceAudit {
  id: string;
  action: string;
  actor: string;
  timestamp: number;
  details: Record<string, any>;
}

export interface GovernanceContext {
  policies: GovernancePolicy[];
  decisions: GovernanceDecision[];
  approvals: GovernanceApproval[];
  workflows: GovernanceWorkflow[];
  compliance: GovernanceCompliance[];
  audits: GovernanceAudit[];
  workspaceId: string | null;
}
