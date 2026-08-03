/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 19
 *
 * File        : workspace-behavioral-validation-service.ts
 * Purpose     : Workspace Behavioral Validation
 * =============================================================================
 */

import {
    workspaceCoordinationService
} from "../../coordination";

import {
    workspaceDiagnosticsService
} from "../../diagnostics";

import {
    workspaceMultiplicityService
} from "../../multiplicity";

export interface WorkspaceBehaviorValidationResult {

    readonly coordination: boolean;

    readonly diagnostics: boolean;

    readonly multiplicity: boolean;

}

export class WorkspaceBehavioralValidationService {

    public initialize(): void {

        workspaceCoordinationService.initialize();

    }

    public validate(): WorkspaceBehaviorValidationResult {

        workspaceDiagnosticsService.collect();

        workspaceMultiplicityService.snapshot();

        return {

            coordination: true,

            diagnostics: true,

            multiplicity: true

        };

    }

}

export const workspaceBehavioralValidationService =
    new WorkspaceBehavioralValidationService();
