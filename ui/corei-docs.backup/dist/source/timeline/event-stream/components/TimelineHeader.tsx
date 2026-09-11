import type {
    ReactElement
} from "react";

import type {
    TimelineStreamStatus,
    TimelineSurfaceIdentity
} from "../models/timeline-micro-model";

export interface TimelineHeaderProps {
    readonly identity: TimelineSurfaceIdentity;
    readonly status: TimelineStreamStatus;
}

export function TimelineHeader({
    identity,
    status
}: TimelineHeaderProps): ReactElement {

    return (

        <header
            className="corei-timeline-header"
            data-timeline-surface="header"
        >

            <div className="corei-timeline-header-identity">

                <span className="corei-timeline-header-label">
                    {identity.label}
                </span>

                <span className="corei-timeline-header-mode">
                    {identity.mode}
                </span>

            </div>

            <div
                className="corei-timeline-status"
                data-timeline-status-tone={status.tone}
            >

                <span
                    className="corei-timeline-status-indicator"
                    aria-hidden="true"
                />

                <span className="corei-timeline-status-label">
                    {status.label}
                </span>

            </div>

        </header>

    );

}

export default TimelineHeader;
