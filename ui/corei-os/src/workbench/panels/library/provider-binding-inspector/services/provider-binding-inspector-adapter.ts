/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 *
 * File        : provider-binding-inspector-adapter.ts
 * Purpose     : Provider Binding Inspector Adapter
 * =============================================================================
 */

import {
    CapabilityProviderBindingRegistry,
    type CapabilityProviderBinding
} from "@/capabilities/integration";

export interface ProviderBindingInspectorItem {

    readonly capabilityId: string;

    readonly providerId: string;

    readonly priority: number;

    readonly enabled: boolean;

}

export class ProviderBindingInspectorAdapter {

    private readonly registry =
        new CapabilityProviderBindingRegistry();

    public load():
    readonly ProviderBindingInspectorItem[] {

        return this.registry
            .getAll()
            .map(
                this.toItem
            )
            .sort(
                this.sortItems
            );

    }

    public search(
        value: string
    ):
    readonly ProviderBindingInspectorItem[] {

        const keyword =
            value
                .trim()
                .toLowerCase();

        if (!keyword.length) {

            return this.load();

        }

        return this.load().filter(

            binding =>

                binding.capabilityId
                    .toLowerCase()
                    .includes(keyword)

                ||

                binding.providerId
                    .toLowerCase()
                    .includes(keyword)

        );

    }

    private readonly toItem = (

        binding: CapabilityProviderBinding

    ): ProviderBindingInspectorItem => ({

        capabilityId: binding.capabilityId,

        providerId: binding.providerId,

        priority: binding.priority,

        enabled: binding.enabled

    });

    private readonly sortItems = (

        left: ProviderBindingInspectorItem,

        right: ProviderBindingInspectorItem

    ): number => {

        const compare =

            left.capabilityId.localeCompare(
                right.capabilityId
            );

        if (compare !== 0) {

            return compare;

        }

        return left.priority - right.priority;

    };

}

export const providerBindingInspectorAdapter =
    new ProviderBindingInspectorAdapter();
