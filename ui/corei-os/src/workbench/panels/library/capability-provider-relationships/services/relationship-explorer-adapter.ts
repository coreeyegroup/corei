/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 *
 * Component   : Capability Provider Relationship Explorer
 * File        : relationship-explorer-adapter.ts
 *
 * =============================================================================
 */

import {

    CapabilityProviderBindingRegistry,
    type CapabilityProviderBinding

} from "@/capabilities/integration";

export interface RelationshipExplorerItem {

    readonly capabilityId: string;

    readonly providerId: string;

    readonly priority: number;

    readonly enabled: boolean;

}

export class RelationshipExplorerAdapter {

    private readonly registry =
        new CapabilityProviderBindingRegistry();

    public load():
    readonly RelationshipExplorerItem[] {

        return this.registry
            .getAll()
            .map(this.toItem)
            .sort(this.sortItems);

    }

    public search(
        value: string
    ): readonly RelationshipExplorerItem[] {

        const keyword =
            value
                .trim()
                .toLowerCase();

        if (!keyword.length) {

            return this.load();

        }

        return this.load().filter(

            relationship =>

                relationship.capabilityId
                    .toLowerCase()
                    .includes(keyword)

                ||

                relationship.providerId
                    .toLowerCase()
                    .includes(keyword)

        );

    }

    private readonly toItem = (

        binding: CapabilityProviderBinding

    ): RelationshipExplorerItem => ({

        capabilityId: binding.capabilityId,

        providerId: binding.providerId,

        priority: binding.priority,

        enabled: binding.enabled,

    });

    private readonly sortItems = (

        left: RelationshipExplorerItem,

        right: RelationshipExplorerItem

    ): number => {

        const capabilityCompare =
            left.capabilityId.localeCompare(
                right.capabilityId
            );

        if (capabilityCompare !== 0) {

            return capabilityCompare;

        }

        return left.priority - right.priority;

    };

}

export const relationshipExplorerAdapter =
    new RelationshipExplorerAdapter();
