/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * =============================================================================
 */

import type {

    RelationshipExplorerItem

} from "../services/relationship-explorer-adapter";

import {

    RelationshipStatusBadge

} from "./RelationshipStatusBadge";

interface RelationshipListProps {

    readonly items:
        readonly RelationshipExplorerItem[];

    readonly selected?:
        RelationshipExplorerItem;

    readonly onSelect: (
        item: RelationshipExplorerItem
    ) => void;

}

export function RelationshipList({

    items,
    selected,
    onSelect

}: RelationshipListProps) {

    return (

        <div
            className="
                flex
                flex-col
                overflow-auto
            "
        >

            {

                items.map(

                    item => (

                        <button
                            key={`${item.capabilityId}:${item.providerId}`}
                            type="button"
                            onClick={() => onSelect(item)}
                            className={`
                                w-full
                                border-b
                                px-3
                                py-2
                                text-left
                                hover:bg-accent
                                ${
                                    selected?.capabilityId === item.capabilityId &&
                                    selected?.providerId === item.providerId
                                        ? "bg-accent"
                                        : ""
                                }
                            `}
                        >

                            <div className="font-medium">

                                {item.capabilityId}

                            </div>

                            <div className="text-xs text-muted-foreground">

                                {item.providerId}

                            </div>

                            <div className="mt-2">

                                <RelationshipStatusBadge
                                    enabled={item.enabled}
                                />

                            </div>

                        </button>

                    )

                )

            }

        </div>

    );

}
