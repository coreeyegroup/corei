/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 *
 * File        : capability-provider-operational-observation.ts
 * Purpose     : Provider Failure, Health & Availability Observation Contract
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Defines the read-only operational observations consumed by the
 * Capability Provider Integration boundary after provider runtime eligibility
 * has already been established.
 *
 * The observation integrates three independent operational dimensions:
 *
 * 1. explicit provider failure,
 * 2. authoritative Foundation health status,
 * 3. current provider availability.
 *
 * -----------------------------------------------------------------------------
 * OWNERSHIP
 * -----------------------------------------------------------------------------
 *
 * This contract does not own or redefine platform health vocabulary.
 *
 * Health semantics are consumed from the existing authoritative Foundation
 * Health framework.
 *
 * The failure and availability values are integration observations only.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * This contract does not:
 *
 * - mutate provider state,
 * - mutate Foundation health state,
 * - create health telemetry,
 * - initialize providers,
 * - load providers,
 * - activate providers,
 * - deactivate providers,
 * - dispose providers,
 * - perform recovery,
 * - perform retry,
 * - perform provider failover,
 * - execute capability behavior.
 *
 * =============================================================================
 */

import type {

    HealthStatus

} from "../../foundation";

/**
 * =============================================================================
 * CAPABILITY PROVIDER OPERATIONAL OBSERVATION
 * =============================================================================
 *
 * Represents the operational facts observed by the Phase-18 integration
 * boundary for an already runtime-eligible provider.
 *
 * The observation is immutable and evaluation-only.
 *
 * =============================================================================
 */
export interface CapabilityProviderOperationalObservation {

    /**
     * Indicates that an explicit provider failure condition has been observed.
     */
    readonly failed: boolean;

    /**
     * Authoritative platform health classification supplied by the existing
     * Foundation Health framework.
     */
    readonly health: HealthStatus;

    /**
     * Indicates whether the provider is currently available for participation.
     */
    readonly available: boolean;

}
