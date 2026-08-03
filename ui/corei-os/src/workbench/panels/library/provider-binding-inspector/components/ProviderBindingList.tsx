/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * =============================================================================
 */

import type {

    ProviderBindingInspectorItem

} from "../services/provider-binding-inspector-adapter";

import {

    ProviderBindingStatusBadge

} from "./ProviderBindingStatusBadge";

interface ProviderBindingListProps {

    readonly items:
        readonly ProviderBindingInspectorItem[];

    readonly selected?:
        ProviderBindingInspectorItem;

    readonly onSelect: (
        item: ProviderBindingInspectorItem
    ) => void;

}

export function ProviderBindingList({

    items,
    selected,
    onSelect

}: ProviderBindingListProps) {

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

                            <div className="mt-2 flex items-center justify-between">

                                <ProviderBindingStatusBadge
                                    enabled={item.enabled}
                                />

                                <span className="text-xs">

                                    P{item.priority}

                                </span>

                            </div>

                        </button>

                    )

                )

            }

        </div>

    );

}
