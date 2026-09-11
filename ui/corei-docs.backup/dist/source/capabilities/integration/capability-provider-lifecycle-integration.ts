/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 *
 * File        : capability-provider-lifecycle-integration.ts
 * Purpose     : Provider Lifecycle Eligibility Integration
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Integrates deterministic capability-provider resolution with the existing
 * UI Provider Platform lifecycle contract.
 *
 * The integration:
 *
 * 1. preserves unresolved capability outcomes,
 * 2. resolves provider identity through UIProviderManager,
 * 3. reports missing provider identities explicitly,
 * 4. observes an existing UIProviderLifecycle,
 * 5. classifies ACTIVE lifecycle state as eligible for later runtime use.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * This integration does not:
 *
 * - create provider lifecycle state,
 * - mutate provider lifecycle state,
 * - initialize providers,
 * - activate providers,
 * - deactivate providers,
 * - dispose providers,
 * - instantiate provider technologies,
 * - execute provider runtime behavior,
 * - perform health-aware failover.
 *
 * =============================================================================
 */

import {

    DefaultUIProviderLifecycle,
    UIProviderManager

} from "../../providers";

import type {

    UIProviderLifecycle

} from "../../providers";

import type {

    CapabilityProviderResolution

} from "./capability-provider-resolution";

import type {

    CapabilityProviderLifecycleResult

} from "./capability-provider-lifecycle-result";

export class CapabilityProviderLifecycleIntegration {

    public constructor(

        private readonly providerManager:
            UIProviderManager,

        private readonly lifecycle:
            UIProviderLifecycle =
                DefaultUIProviderLifecycle

    ) {}

    /**
     * Integrates an existing capability-provider resolution with
     * the existing Provider Platform lifecycle contract.
     */
    public evaluate(
        resolution:
            CapabilityProviderResolution
    ): CapabilityProviderLifecycleResult {

        if (
            resolution.status ===
            "unresolved"
        ) {

            return {

                status:
                    "capability_unresolved",

                capabilityId:
                    resolution.capabilityId

            };

        }

        const provider =
            this.providerManager.findById(
                resolution.providerId
            );

        if (
            !provider
        ) {

            return {

                status:
                    "provider_not_found",

                capabilityId:
                    resolution.capabilityId,

                providerId:
                    resolution.providerId

            };

        }

        if (
            this.lifecycle.state !==
            "ACTIVE"
        ) {

            return {

                status:
                    "lifecycle_ineligible",

                capabilityId:
                    resolution.capabilityId,

                providerId:
                    resolution.providerId,

                provider,

                lifecycle:
                    this.lifecycle

            };

        }

        return {

            status:
                "lifecycle_eligible",

            capabilityId:
                resolution.capabilityId,

            providerId:
                resolution.providerId,

            provider,

            lifecycle:
                this.lifecycle

        };

    }

}
