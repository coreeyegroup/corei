/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 *
 * File        : capability-provider-binding-registry.ts
 * Purpose     : Capability ↔ Provider Binding Registry
 *
 * -----------------------------------------------------------------------------
 * RESPONSIBILITY
 * -----------------------------------------------------------------------------
 *
 * Owns the in-memory registration and deterministic lookup of relationships
 * between existing capability identities and existing provider identities.
 *
 * The registry stores relationship metadata only.
 *
 * It does not:
 *
 * - validate capability existence,
 * - validate provider existence,
 * - resolve provider implementations,
 * - initialize providers,
 * - dispose providers,
 * - execute provider lifecycle behavior.
 *
 * -----------------------------------------------------------------------------
 * DETERMINISM
 * -----------------------------------------------------------------------------
 *
 * Capability lookups are ordered by:
 *
 * 1. ascending priority,
 * 2. provider identity as a stable lexical tie-breaker.
 *
 * =============================================================================
 */

import type {

    CapabilityProviderBinding

} from "./capability-provider-binding";

import type {

    CapabilityProviderBindings

} from "./capability-provider-bindings";

export class CapabilityProviderBindingRegistry {

    private readonly bindings:
        CapabilityProviderBinding[] = [];

    /**
     * Registers a capability-to-provider relationship.
     *
     * An identical capability/provider pair is stored only once.
     */
    public register(
        binding: CapabilityProviderBinding
    ): void {

        const existingBinding =
            this.find(
                binding.capabilityId,
                binding.providerId
            );

        if (
            existingBinding
        ) {

            return;

        }

        this.bindings.push(
            binding
        );

    }

    /**
     * Returns every registered binding.
     */
    public getAll():
        CapabilityProviderBindings {

        return [
            ...this.bindings
        ];

    }

    /**
     * Returns bindings associated with a capability identity
     * in deterministic preference order.
     */
    public findByCapabilityId(
        capabilityId: string
    ): CapabilityProviderBindings {

        return this.bindings
            .filter(
                binding =>
                    binding.capabilityId ===
                    capabilityId
            )
            .sort(
                (
                    left,
                    right
                ) => {

                    const priorityDifference =
                        left.priority -
                        right.priority;

                    if (
                        priorityDifference !== 0
                    ) {

                        return priorityDifference;

                    }

                    return left.providerId.localeCompare(
                        right.providerId
                    );

                }
            );

    }

    /**
     * Returns bindings associated with a provider identity.
     */
    public findByProviderId(
        providerId: string
    ): CapabilityProviderBindings {

        return this.bindings.filter(
            binding =>
                binding.providerId ===
                providerId
        );

    }

    /**
     * Returns the exact capability/provider relationship,
     * when registered.
     */
    public find(
        capabilityId: string,
        providerId: string
    ): CapabilityProviderBinding | undefined {

        return this.bindings.find(
            binding =>
                binding.capabilityId ===
                    capabilityId &&
                binding.providerId ===
                    providerId
        );

    }

}
