/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 *
 * File        : capability-provider-resolver.ts
 * Purpose     : Deterministic Capability Provider Resolver
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Resolves the preferred enabled provider binding for an existing capability
 * identity.
 *
 * Resolution consumes the deterministic ordering owned by the
 * CapabilityProviderBindingRegistry.
 *
 * The resolver:
 *
 * 1. requests bindings for a capability identity,
 * 2. excludes disabled bindings,
 * 3. selects the first remaining deterministic binding,
 * 4. returns an explicit resolved or unresolved result.
 *
 * -----------------------------------------------------------------------------
 * BOUNDARY
 * -----------------------------------------------------------------------------
 *
 * This resolver returns provider identity and binding metadata only.
 *
 * It does not:
 *
 * - validate provider runtime availability,
 * - initialize providers,
 * - activate providers,
 * - dispose providers,
 * - instantiate technologies,
 * - execute adapters,
 * - perform health-aware failover.
 *
 * =============================================================================
 */

import type {

    CapabilityProviderBindingRegistry

} from "./capability-provider-binding-registry";

import type {

    CapabilityProviderResolution

} from "./capability-provider-resolution";

export class CapabilityProviderResolver {

    public constructor(

        private readonly bindingRegistry:
            CapabilityProviderBindingRegistry

    ) {}

    /**
     * Resolves the highest-preference enabled provider binding
     * for the requested capability identity.
     */
    public resolve(
        capabilityId: string
    ): CapabilityProviderResolution {

        const eligibleBinding =
            this.bindingRegistry
                .findByCapabilityId(
                    capabilityId
                )
                .find(
                    binding =>
                        binding.enabled
                );

        if (
            !eligibleBinding
        ) {

            return {

                status: "unresolved",
                capabilityId

            };

        }

        return {

            status: "resolved",
            capabilityId,
            providerId:
                eligibleBinding.providerId,
            binding:
                eligibleBinding

        };

    }

}
