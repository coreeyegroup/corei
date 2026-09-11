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

interface ResolutionMonitorSummaryProps {

    readonly items:
        readonly ResolutionMonitorItem[];

}

export function ResolutionMonitorSummary({

    items

}: ResolutionMonitorSummaryProps) {

    const resolved =

        items.filter(

            item =>

                item.status ===
                "resolved"

        ).length;

    const unresolved =
        items.length - resolved;

    return (

        <div
            className="
                flex
                gap-6
                rounded-md
                border
                p-3
                text-sm
            "
        >

            <div>

                Requests

                <strong className="ml-2">

                    {items.length}

                </strong>

            </div>

            <div>

                Resolved

                <strong className="ml-2">

                    {resolved}

                </strong>

            </div>

            <div>

                Unresolved

                <strong className="ml-2">

                    {unresolved}

                </strong>

            </div>

        </div>

    );

}
