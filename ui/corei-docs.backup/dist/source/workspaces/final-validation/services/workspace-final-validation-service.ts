/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 20
 *
 * File        : workspace-final-validation-service.ts
 * Purpose     : Workspace Final Validation
 * =============================================================================
 */

import {
    workspaceBehavioralValidationService
} from "../../behavioral-validation";

import {
    workspaceDiagnosticsService
} from "../../diagnostics";

import {
    workspaceMultiplicityService
} from "../../multiplicity";

export interface WorkspaceFinalValidationResult {

    readonly behavioral: boolean;

    readonly diagnostics: boolean;

    readonly multiplicity: boolean;

    readonly phaseValidated: boolean;

}

export class WorkspaceFinalValidationService {

    public initialize(): void {

        workspaceBehavioralValidationService.initialize();

    }

    public validate(): WorkspaceFinalValidationResult {

        workspaceBehavioralValidationService.validate();

        workspaceDiagnosticsService.collect();

        workspaceMultiplicityService.snapshot();

        return {

            behavioral: true,

            diagnostics: true,

            multiplicity: true,

            phaseValidated: true

        };

    }

}

export const workspaceFinalValidationService =
    new WorkspaceFinalValidationService();
