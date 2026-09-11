/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-10
 *
 * FILE:
 * TimelineEventStream.tsx
 *
 * PURPOSE:
 * Institutional Bottom Timeline Composition Root
 *
 * DESCRIPTION:
 * Defines the authoritative outer composition boundary for the existing
 * Timeline Event Stream subsystem.
 *
 * This component composes the existing Timeline Provider and Timeline Bar.
 * It does not recreate the event model, event engine, event store, timeline
 * runtime, Event Platform, State Platform, or persistence infrastructure.
 *
 * AUTHORITATIVE COMPOSITION:
 *
 * Shell BottomRegion
 *     ↓
 * Timeline Public API
 *     ↓
 * TimelineEventStream
 *     ↓
 * TimelineProvider
 *     ↓
 * TimelineBar
 *     ↓
 * Existing Timeline Event Stream Foundation
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    TimelineProvider
} from "./provider/timeline-provider";

import {
    TimelineBar
} from "./layout/timeline-bar";

export function TimelineEventStream(): ReactElement {

    return (

        <TimelineProvider>

            <TimelineBar />

        </TimelineProvider>

    );

}

export default TimelineEventStream;
