// src/compliance/services/ComplianceService.ts
/**
 * COREI – Compliance Core Service
 * Stage-25 / Phase-25
 */
import { ComplianceState } from '../state/ComplianceState';
import { ComplianceControl, ComplianceObligation, ComplianceEvidence, ComplianceException, ComplianceMonitoring, ComplianceReport } from '../models/ComplianceModels';

export class ComplianceService {
  private state: ComplianceState;

  constructor(state: ComplianceState) {
    this.state = state;
  }

  getControls(): ComplianceControl[] {
    return this.state.getContext().controls;
  }

  getObligations(): ComplianceObligation[] {
    return this.state.getContext().obligations;
  }

  getEvidence(): ComplianceEvidence[] {
    return this.state.getContext().evidence;
  }

  getExceptions(): ComplianceException[] {
    return this.state.getContext().exceptions;
  }

  getMonitoring(): ComplianceMonitoring[] {
    return this.state.getContext().monitoring;
  }

  getReports(): ComplianceReport[] {
    return this.state.getContext().reports;
  }

  getDiagnostics() {
    return {
      service: 'ComplianceService',
      controls: this.getControls().length,
      obligations: this.getObligations().length,
      evidence: this.getEvidence().length,
      exceptions: this.getExceptions().length,
      monitoring: this.getMonitoring().length,
      reports: this.getReports().length,
    };
  }
}
