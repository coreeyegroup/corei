import type {
    ReactElement
} from "react";

export function TimelineControls(): ReactElement {

    return (

        <div
            className="corei-timeline-controls"
            data-timeline-surface="controls"
        >

            <span className="corei-timeline-control-label">
                Event Stream
            </span>

            <span className="corei-timeline-control-separator">
                /
            </span>

            <span className="corei-timeline-control-value">
                Realtime
            </span>

        </div>

    );

}

export default TimelineControls;
