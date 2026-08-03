import type {
    RuntimeMonitorItem
} from "../services/runtime-monitor-adapter";

interface RuntimeMonitorSummaryProps {

    readonly items:
        readonly RuntimeMonitorItem[];

}

export function RuntimeMonitorSummary({

    items

}: RuntimeMonitorSummaryProps) {

    const runtimeEligible =

        items.filter(

            item =>

                item.status ===
                "runtime_eligible"

        ).length;

    const runtimeIneligible =

        items.filter(

            item =>

                item.status ===
                "runtime_ineligible"

        ).length;

    const upstream =

        items.filter(

            item =>

                item.status ===
                    "capability_unresolved"

                ||

                item.status ===
                    "provider_not_found"

                ||

                item.status ===
                    "lifecycle_ineligible"

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

                Runtime Ready

                <strong className="ml-2">

                    {runtimeEligible}

                </strong>

            </div>

            <div>

                Runtime Blocked

                <strong className="ml-2">

                    {runtimeIneligible}

                </strong>

            </div>

            <div>

                Upstream

                <strong className="ml-2">

                    {upstream}

                </strong>

            </div>

        </div>

    );

}
