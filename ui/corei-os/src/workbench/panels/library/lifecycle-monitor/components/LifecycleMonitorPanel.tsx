/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 *
 * File        : LifecycleMonitorPanel.tsx
 * =============================================================================
 */

import {

    useLifecycleMonitor

} from "../hooks/useLifecycleMonitor";

import {

    LifecycleMonitorToolbar

} from "./LifecycleMonitorToolbar";

import {

    LifecycleMonitorSearch

} from "./LifecycleMonitorSearch";

import {

    LifecycleMonitorSummary

} from "./LifecycleMonitorSummary";

import {

    LifecycleMonitorList

} from "./LifecycleMonitorList";

import {

    LifecycleMonitorDetails

} from "./LifecycleMonitorDetails";

import {

    LifecycleMonitorEmptyState

} from "./LifecycleMonitorEmptyState";

export function LifecycleMonitorPanel() {

    const monitor =
        useLifecycleMonitor();

    return (

        <div
            className="
                flex
                h-full
                flex-col
            "
        >

            <LifecycleMonitorToolbar
                total={monitor.items.length}
            />

            <div className="p-3">

                <LifecycleMonitorSearch
                    value={monitor.search}
                    onChange={monitor.setSearch}
                />

            </div>

            <div className="px-3 pb-3">

                <LifecycleMonitorSummary
                    items={monitor.items}
                />

            </div>

            {

                monitor.items.length === 0

                    ? (

                        <LifecycleMonitorEmptyState />

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

                            <LifecycleMonitorList
                                items={monitor.items}
                                selected={monitor.selected}
                                onSelect={monitor.select}
                            />

                            <LifecycleMonitorDetails
                                lifecycle={
                                    monitor.selected
                                }
                            />

                        </div>

                    )

            }

        </div>

    );

}
