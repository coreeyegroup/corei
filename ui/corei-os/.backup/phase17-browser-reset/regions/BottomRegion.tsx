/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-10
 *
 * FILE:
 * BottomRegion.tsx
 *
 * PURPOSE:
 * Institutional Bottom Timeline Shell Integration
 *
 * DESCRIPTION:
 * Defines the authoritative integration boundary between the Institutional
 * Shell bottom region and the existing Timeline Event Stream subsystem.
 *
 * The Shell consumes only the Timeline public API.
 *
 * The Shell does not directly consume timeline provider, runtime, engine,
 * event store, event model, Event Platform, State Platform, or persistence
 * internals.
 *
 * AUTHORITATIVE COMPOSITION:
 *
 * ShellLayout
 *     ↓
 * BottomRegion
 *     ↓
 * Timeline Public API
 *     ↓
 * TimelineEventStream
 *     ↓
 * Existing Timeline Event Stream Foundation
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import {
    TimelineEventStream
} from "../../../timeline";

export function BottomRegion(): ReactElement {

    return (

        <footer
            className="corei-shell-region corei-shell-region-bottom"
            data-region="bottom"
            data-shell-integration="timeline-event-stream"
        >

            <TimelineEventStream />

        </footer>

    );

}

export default BottomRegion;
