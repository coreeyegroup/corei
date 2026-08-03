/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * =============================================================================
 */

import type {

    LifecycleMonitorItem

} from "../services/lifecycle-monitor-adapter";

import {

    LifecycleStatusBadge

} from "./LifecycleStatusBadge";

interface LifecycleMonitorListProps {

    readonly items:
        readonly LifecycleMonitorItem[];

    readonly selected?:
        LifecycleMonitorItem;

    readonly onSelect: (
        item: LifecycleMonitorItem
    ) => void;

}

export function LifecycleMonitorList({

    items,
    selected,
    onSelect

}: LifecycleMonitorListProps) {

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
                            key={item.capabilityId}
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
                                    selected?.capabilityId === item.capabilityId
                                        ? "bg-accent"
                                        : ""
                                }
                            `}
                        >

                            <div className="font-medium">

                                {item.capabilityId}

                            </div>

                            <div className="mt-2 flex items-center justify-between">

                                <LifecycleStatusBadge
                                    status={item.status}
                                />

                                {

                                    item.providerId && (

                                        <span className="text-xs text-muted-foreground">

                                            {item.providerId}

                                        </span>

                                    )

                                }

                            </div>

                        </button>

                    )

                )

            }

        </div>

    );

}
