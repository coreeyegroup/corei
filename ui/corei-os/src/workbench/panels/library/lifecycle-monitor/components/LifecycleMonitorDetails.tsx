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

interface LifecycleMonitorDetailsProps {

    readonly lifecycle?:
        LifecycleMonitorItem;

}

export function LifecycleMonitorDetails({

    lifecycle

}: LifecycleMonitorDetailsProps) {

    if (!lifecycle) {

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

                    {lifecycle.capabilityId}

                </div>

            </div>

            <div>

                <strong>Lifecycle Result</strong>

                <div>

                    {lifecycle.status}

                </div>

            </div>

            <div>

                <strong>Provider</strong>

                <div>

                    {lifecycle.providerId ?? "-"}

                </div>

            </div>

            <div>

                <strong>Lifecycle State</strong>

                <div>

                    {lifecycle.lifecycleState ?? "-"}

                </div>

            </div>

        </div>

    );

}
