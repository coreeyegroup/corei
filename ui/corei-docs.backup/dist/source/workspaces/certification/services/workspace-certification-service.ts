/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 19
 * Step        : 21
 *
 * File        : workspace-certification-service.ts
 * Purpose     : Workspace Platform Certification & Freeze
 * =============================================================================
 */

import {
    workspaceFinalValidationService
} from "../../final-validation";

export interface WorkspaceCertificationResult {

    readonly certified: boolean;

    readonly frozen: boolean;

    readonly phase: number;

    readonly step: number;

}

export class WorkspaceCertificationService {

    public initialize(): void {

        workspaceFinalValidationService.initialize();

    }

    public certify(): WorkspaceCertificationResult {

        workspaceFinalValidationService.validate();

        return {

            certified: true,

            frozen: true,

            phase: 19,

            step: 21

        };

    }

}

export const workspaceCertificationService =
    new WorkspaceCertificationService();
