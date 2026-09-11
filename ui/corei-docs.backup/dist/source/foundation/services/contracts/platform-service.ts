/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 03.01
 *
 * File        : platform-service.ts
 * Purpose     : Base contract implemented by all platform services.
 * =============================================================================
 */

export interface PlatformService {

    readonly id: string;

    initialize(): void;

    dispose(): void;

}
