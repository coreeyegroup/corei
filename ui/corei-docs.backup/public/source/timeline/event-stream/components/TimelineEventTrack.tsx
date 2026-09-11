import type {
    ReactElement
} from "react";

import type {
    TimelineEventCategory
} from "../models/timeline-micro-model";

export interface TimelineEventTrackProps {
    readonly categories: readonly TimelineEventCategory[];
}

export function TimelineEventTrack({
    categories
}: TimelineEventTrackProps): ReactElement {

    return (

        <div
            className="corei-timeline-event-track"
            data-timeline-surface="event-track"
        >

            <div
                className="corei-timeline-track-line"
                aria-hidden="true"
            />

            <div className="corei-timeline-event-categories">

                {categories.map((category) => (

                    <div
                        key={category.id}
                        className={
                            category.id === "navigation"
                                ? "corei-timeline-event-category corei-timeline-event-category--active"
                                : "corei-timeline-event-category"
                        }
                        data-timeline-category={category.id}
                    >

                        <span
                            className="corei-timeline-event-node"
                            aria-hidden="true"
                        />

                        <span className="corei-timeline-event-label">
                            {category.label}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default TimelineEventTrack;
