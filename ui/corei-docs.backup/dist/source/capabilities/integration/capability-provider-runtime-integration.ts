/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 *
 * File        : capability-provider-runtime-integration.ts
 * Purpose     : Provider Runtime Readiness Integration
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Integrates an existing capability-provider lifecycle result with the
 * existing Provider Platform runtime contract.
 *
 * The integration:
 *
 * 1. preserves upstream non-eligible outcomes,
 * 2. accepts lifecycle-eligible providers for runtime evaluation,
 * 3. observes the existing ProviderRuntime state,
 * 4. classifies initialized + loaded runtime state as eligible.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * This integration does not:
 *
 * - mutate runtime state,
 * - initialize providers,
 * - load providers,
 * - activate providers,
 * - deactivate providers,
 * - dispose providers,
 * - instantiate provider technologies,
 * - execute capability behavior,
 * - perform health-aware failover.
 *
 * =============================================================================
 */

import type {

    ProviderRuntime

} from "../../providers";

import type {

    CapabilityProviderLifecycleResult

} from "./capability-provider-lifecycle-result";

import type {

    CapabilityProviderRuntimeResult

} from "./capability-provider-runtime-result";

export class CapabilityProviderRuntimeIntegration {

    public constructor(

        private readonly runtime:
            ProviderRuntime

    ) {}

    /**
     * Integrates lifecycle eligibility with existing provider
     * runtime readiness.
     */
    public evaluate(
        lifecycleResult:
            CapabilityProviderLifecycleResult
    ): CapabilityProviderRuntimeResult {

        if (
            lifecycleResult.status !==
            "lifecycle_eligible"
        ) {

            return lifecycleResult;

        }

        if (
            !this.runtime.initialized ||
            !this.runtime.loaded
        ) {

            return {

                status:
                    "runtime_ineligible",

                capabilityId:
                    lifecycleResult.capabilityId,

                providerId:
                    lifecycleResult.providerId,

                runtime:
                    this.runtime

            };

        }

        return {

            status:
                "runtime_eligible",

            capabilityId:
                lifecycleResult.capabilityId,

            providerId:
                lifecycleResult.providerId,

            runtime:
                this.runtime

        };

    }

}
