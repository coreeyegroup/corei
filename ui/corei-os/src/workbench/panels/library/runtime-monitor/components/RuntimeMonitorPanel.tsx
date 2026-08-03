/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * =============================================================================
 */

import {

    useRuntimeMonitor

} from "../hooks/useRuntimeMonitor";

import {

    RuntimeMonitorToolbar

} from "./RuntimeMonitorToolbar";

import {

    RuntimeMonitorSearch

} from "./RuntimeMonitorSearch";

import {

    RuntimeMonitorSummary

} from "./RuntimeMonitorSummary";

import {

    RuntimeMonitorList

} from "./RuntimeMonitorList";

import {

    RuntimeMonitorDetails

} from "./RuntimeMonitorDetails";

import {

    RuntimeMonitorEmptyState

} from "./RuntimeMonitorEmptyState";

export function RuntimeMonitorPanel() {

    const monitor =
        useRuntimeMonitor();

    return (

        <div
            className="
                flex
                h-full
                flex-col
            "
        >

            <RuntimeMonitorToolbar
                total={monitor.items.length}
            />

            <div className="p-3">

                <RuntimeMonitorSearch
                    value={monitor.search}
                    onChange={monitor.setSearch}
                />

            </div>

            <div className="px-3 pb-3">

                <RuntimeMonitorSummary
                    items={monitor.items}
                />

            </div>

            {

                monitor.items.length === 0

                    ? (

                        <RuntimeMonitorEmptyState />

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

                            <RuntimeMonitorList
                                items={monitor.items}
                                selected={monitor.selected}
                                onSelect={monitor.select}
                            />

                            <RuntimeMonitorDetails
                                runtime={
                                    monitor.selected
                                }
                            />

                        </div>

                    )

            }

        </div>

    );

}
