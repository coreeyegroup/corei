/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 09
 *
 * File        : certification-contract.ts
 * Purpose     : Architecture Certification Contract
 * =============================================================================
 */

export interface CertificationContract {

    readonly id: string;

    readonly name: string;

    readonly status: "PENDING" | "CERTIFIED";

    readonly description: string;

}
