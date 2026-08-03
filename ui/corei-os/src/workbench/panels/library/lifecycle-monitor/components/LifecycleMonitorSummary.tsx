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

interface LifecycleMonitorSummaryProps {

    readonly items:
        readonly LifecycleMonitorItem[];

}

export function LifecycleMonitorSummary({

    items

}: LifecycleMonitorSummaryProps) {

    const eligible =

        items.filter(

            item =>

                item.status ===
                "lifecycle_eligible"

        ).length;

    const ineligible =

        items.filter(

            item =>

                item.status ===
                "lifecycle_ineligible"

        ).length;

    const unresolved =

        items.filter(

            item =>

                item.status ===
                    "capability_unresolved"

                ||

                item.status ===
                    "provider_not_found"

        ).length;

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

                Total

                <strong className="ml-2">

                    {items.length}

                </strong>

            </div>

            <div>

                Eligible

                <strong className="ml-2">

                    {eligible}

                </strong>

            </div>

            <div>

                Ineligible

                <strong className="ml-2">

                    {ineligible}

                </strong>

            </div>

            <div>

                Other

                <strong className="ml-2">

                    {unresolved}

                </strong>

            </div>

        </div>

    );

}
