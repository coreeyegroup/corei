import type {
    RuntimeMonitorItem
} from "../services/runtime-monitor-adapter";

interface RuntimeMonitorDetailsProps {

    readonly runtime?:
        RuntimeMonitorItem;

}

export function RuntimeMonitorDetails({

    runtime

}: RuntimeMonitorDetailsProps) {

    if (!runtime) {

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

                    {runtime.capabilityId}

                </div>

            </div>

            <div>

                <strong>Status</strong>

                <div>

                    {runtime.status}

                </div>

            </div>

            <div>

                <strong>Provider</strong>

                <div>

                    {runtime.providerId ?? "-"}

                </div>

            </div>

            <div>

                <strong>Initialized</strong>

                <div>

                    {

                        runtime.initialized === undefined
                            ? "-"
                            : String(runtime.initialized)

                    }

                </div>

            </div>

            <div>

                <strong>Loaded</strong>

                <div>

                    {

                        runtime.loaded === undefined
                            ? "-"
                            : String(runtime.loaded)

                    }

                </div>

            </div>

        </div>

    );

}
