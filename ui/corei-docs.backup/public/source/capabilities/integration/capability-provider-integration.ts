/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 *
 * File        : capability-provider-integration.ts
 * Purpose     : Deterministic Capability Provider Integration Composition
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Composes the certified Phase-18 capability-provider integration stages into
 * one deterministic public evaluation boundary.
 *
 * Composition order:
 *
 * 1. capability-provider resolution,
 * 2. provider lifecycle eligibility,
 * 3. authoritative runtime observation resolution,
 * 4. provider runtime eligibility,
 * 5. authoritative operational observation resolution,
 * 6. provider operational eligibility.
 *
 * -----------------------------------------------------------------------------
 * SAFETY
 * -----------------------------------------------------------------------------
 *
 * The composition never fabricates runtime, failure, health, or availability
 * truth.
 *
 * Missing authoritative observations are returned as explicit composition
 * outcomes.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * This composition does not:
 *
 * - mutate provider bindings,
 * - mutate provider lifecycle,
 * - mutate provider runtime,
 * - fabricate provider observations,
 * - initialize or load providers,
 * - activate or deactivate providers,
 * - perform retry,
 * - perform recovery,
 * - perform failover,
 * - select alternate providers,
 * - execute provider technologies,
 * - execute capability behavior,
 * - mount Shell or Workbench surfaces.
 *
 * =============================================================================
 */

import type {

    UIProviderManager

} from "../../providers";

import {

    CapabilityProviderLifecycleIntegration

} from "./capability-provider-lifecycle-integration";

import {

    CapabilityProviderOperationalIntegration

} from "./capability-provider-operational-integration";

import {

    CapabilityProviderRuntimeIntegration

} from "./capability-provider-runtime-integration";

import type {

    CapabilityProviderIntegrationResult

} from "./capability-provider-integration-result";

import type {

    CapabilityProviderOperationalObservationResolver

} from "./capability-provider-operational-observation-resolver";

import type {

    CapabilityProviderRuntimeResolver

} from "./capability-provider-runtime-resolver";

import type {

    CapabilityProviderResolver

} from "./capability-provider-resolver";

export class CapabilityProviderIntegration {

    public constructor(

        private readonly resolver:
            CapabilityProviderResolver,

        private readonly providerManager:
            UIProviderManager,

        private readonly runtimeResolver:
            CapabilityProviderRuntimeResolver,

        private readonly operationalObservationResolver:
            CapabilityProviderOperationalObservationResolver

    ) {}

    /**
     * Evaluates one capability through the complete certified Phase-18
     * capability-provider integration chain.
     */
    public evaluate(
        capabilityId: string
    ): CapabilityProviderIntegrationResult {

        /**
         * ---------------------------------------------------------------------
         * 01 — PROVIDER RESOLUTION
         * ---------------------------------------------------------------------
         */
        const resolution =
            this.resolver.resolve(
                capabilityId
            );

        /**
         * ---------------------------------------------------------------------
         * 02 — PROVIDER LIFECYCLE ELIGIBILITY
         * ---------------------------------------------------------------------
         */
        const lifecycleIntegration =
            new CapabilityProviderLifecycleIntegration(
                this.providerManager
            );

        const lifecycleResult =
            lifecycleIntegration.evaluate(
                resolution
            );

        if (
            lifecycleResult.status !==
            "lifecycle_eligible"
        ) {

            return lifecycleResult;

        }

        /**
         * ---------------------------------------------------------------------
         * 03 — AUTHORITATIVE RUNTIME OBSERVATION
         * ---------------------------------------------------------------------
         */
        const runtime =
            this.runtimeResolver.resolve(
                lifecycleResult.providerId
            );

        if (
            runtime === undefined
        ) {

            return {

                status:
                    "provider_runtime_unobserved",

                capabilityId:
                    lifecycleResult.capabilityId,

                providerId:
                    lifecycleResult.providerId

            };

        }

        /**
         * ---------------------------------------------------------------------
         * 04 — PROVIDER RUNTIME ELIGIBILITY
         * ---------------------------------------------------------------------
         */
        const runtimeIntegration =
            new CapabilityProviderRuntimeIntegration(
                runtime
            );

        const runtimeResult =
            runtimeIntegration.evaluate(
                lifecycleResult
            );

        if (
            runtimeResult.status !==
            "runtime_eligible"
        ) {

            return runtimeResult;

        }

        /**
         * ---------------------------------------------------------------------
         * 05 — AUTHORITATIVE OPERATIONAL OBSERVATION
         * ---------------------------------------------------------------------
         */
        const observation =
            this.operationalObservationResolver.resolve(
                runtimeResult.providerId
            );

        if (
            observation === undefined
        ) {

            return {

                status:
                    "provider_operational_unobserved",

                capabilityId:
                    runtimeResult.capabilityId,

                providerId:
                    runtimeResult.providerId

            };

        }

        /**
         * ---------------------------------------------------------------------
         * 06 — PROVIDER OPERATIONAL ELIGIBILITY
         * ---------------------------------------------------------------------
         */
        const operationalIntegration =
            new CapabilityProviderOperationalIntegration();

        return operationalIntegration.evaluate(
            runtimeResult,
            observation
        );

    }

}
