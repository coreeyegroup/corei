/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-09
 * Build Unit : BU-005
 * File       : multi-window-recovery.ts
 * Purpose    : Institutional Multi Window Recovery
 * =============================================================================
 */

import {

    multiWindowService

} from "../services/multi-window-service";

export interface MultiWindowRecovery {

    startup(): void;

    shutdown(): void;

}

class InstitutionalMultiWindowRecovery
implements MultiWindowRecovery {

    startup(): void {

        multiWindowService.initialize();

        multiWindowService.restore();

    }

    shutdown(): void {

        multiWindowService.persist();

    }

}

export const multiWindowRecovery =

    new InstitutionalMultiWindowRecovery();
