/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-20
 *
 * FILE:
 * timeline-bar.tsx
 *
 * PURPOSE:
 * Institutional Timeline Event Stream micro surface.
 *
 * DESCRIPTION:
 * Upgrades the existing TimelineBar presentation while preserving the
 * authoritative Timeline Provider, Runtime, Engine, Store and event model.
 *
 * This component owns presentation composition only.
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    TimelineControls
} from "../components/TimelineControls";

import {
    TimelineEventTrack
} from "../components/TimelineEventTrack";

import {
    TimelineHeader
} from "../components/TimelineHeader";

import {
    DEFAULT_TIMELINE_EVENT_CATEGORIES,
    DEFAULT_TIMELINE_STREAM_STATUS,
    DEFAULT_TIMELINE_SURFACE_IDENTITY
} from "../models/timeline-micro-model";

import "../styles/timeline-event-stream.css";

export function TimelineBar(): ReactElement {

    return (

        <section
            className="corei-timeline"
            data-timeline-surface="event-stream"
            data-timeline-runtime="available"
        >

            <TimelineHeader
                identity={DEFAULT_TIMELINE_SURFACE_IDENTITY}
                status={DEFAULT_TIMELINE_STREAM_STATUS}
            />

            <TimelineEventTrack
                categories={DEFAULT_TIMELINE_EVENT_CATEGORIES}
            />

            <TimelineControls />

        </section>

    );

}

export default TimelineBar;
