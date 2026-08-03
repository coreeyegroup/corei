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

interface ResolutionMonitorDetailsProps {

    readonly resolution?:
        ResolutionMonitorItem;

}

export function ResolutionMonitorDetails({

    resolution

}: ResolutionMonitorDetailsProps) {

    if (!resolution) {

        return null;

    }

    return (

        <div
            className="
                space-y-4
                rounded-md
                border
                p-4
            "
        >

            <div>

                <strong>Capability</strong>

                <div>

                    {resolution.capabilityId}

                </div>

            </div>

            <div>

                <strong>Status</strong>

                <div>

                    {resolution.status}

                </div>

            </div>

            <div>

                <strong>Selected Provider</strong>

                <div>

                    {resolution.providerId ?? "-"}

                </div>

            </div>

            <div>

                <strong>Binding Priority</strong>

                <div>

                    {resolution.priority ?? "-"}

                </div>

            </div>

            <div>

                <strong>Binding Enabled</strong>

                <div>

                    {

                        resolution.enabled === undefined

                            ? "-"

                            : resolution.enabled
                                ? "Yes"
                                : "No"

                    }

                </div>

            </div>

        </div>

    );

}
