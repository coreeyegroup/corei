/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 *
 * File        : ResolutionMonitorPanel.tsx
 * =============================================================================
 */

import {

    useResolutionMonitor

} from "../hooks/useResolutionMonitor";

import {

    ResolutionMonitorToolbar

} from "./ResolutionMonitorToolbar";

import {

    ResolutionMonitorSearch

} from "./ResolutionMonitorSearch";

import {

    ResolutionMonitorSummary

} from "./ResolutionMonitorSummary";

import {

    ResolutionMonitorList

} from "./ResolutionMonitorList";

import {

    ResolutionMonitorDetails

} from "./ResolutionMonitorDetails";

import {

    ResolutionMonitorEmptyState

} from "./ResolutionMonitorEmptyState";

export function ResolutionMonitorPanel() {

    const monitor =
        useResolutionMonitor();

    return (

        <div
            className="
                flex
                h-full
                flex-col
            "
        >

            <ResolutionMonitorToolbar
                total={monitor.items.length}
            />

            <div className="p-3">

                <ResolutionMonitorSearch
                    value={monitor.search}
                    onChange={monitor.setSearch}
                />

            </div>

            <div className="px-3 pb-3">

                <ResolutionMonitorSummary
                    items={monitor.items}
                />

            </div>

            {

                monitor.items.length === 0

                    ? (

                        <ResolutionMonitorEmptyState />

                    )

                    : (

                        <div
                            className="
                                grid
                                h-full
                                grid-cols-2
                                gap-3
                                overflow-hidden
                                px-3
                                pb-3
                            "
                        >

                            <ResolutionMonitorList
                                items={monitor.items}
                                selected={monitor.selected}
                                onSelect={monitor.select}
                            />

                            <ResolutionMonitorDetails
                                resolution={
                                    monitor.selected
                                }
                            />

                        </div>

                    )

            }

        </div>

    );

}
