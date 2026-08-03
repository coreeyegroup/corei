/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * =============================================================================
 */

import type {

    ResolutionMonitorItem

} from "../services/resolution-monitor-adapter";

import {

    ResolutionStatusBadge

} from "./ResolutionStatusBadge";

interface ResolutionMonitorListProps {

    readonly items:
        readonly ResolutionMonitorItem[];

    readonly selected?:
        ResolutionMonitorItem;

    readonly onSelect: (
        item: ResolutionMonitorItem
    ) => void;

}

export function ResolutionMonitorList({

    items,
    selected,
    onSelect

}: ResolutionMonitorListProps) {

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

                                <ResolutionStatusBadge
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
