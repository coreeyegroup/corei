/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-20
 *
 * FILE:
 * timeline-micro-model.ts
 *
 * PURPOSE:
 * Deterministic Timeline micro presentation model.
 *
 * OWNERSHIP:
 * Timeline Event Stream presentation layer.
 *
 ******************************************************************************/

export interface TimelineSurfaceIdentity {
    readonly label: string;
    readonly mode: string;
}

export interface TimelineStreamStatus {
    readonly label: string;
    readonly tone: "operational" | "attention";
}

export interface TimelineEventCategory {
    readonly id: string;
    readonly label: string;
}

export const DEFAULT_TIMELINE_SURFACE_IDENTITY:
    TimelineSurfaceIdentity = Object.freeze({
        label: "System Timeline",
        mode: "Live Event Stream"
    });

export const DEFAULT_TIMELINE_STREAM_STATUS:
    TimelineStreamStatus = Object.freeze({
        label: "Active",
        tone: "operational"
    });

export const DEFAULT_TIMELINE_EVENT_CATEGORIES:
    readonly TimelineEventCategory[] = Object.freeze([
        Object.freeze({
            id: "navigation",
            label: "Navigation"
        }),
        Object.freeze({
            id: "workspace",
            label: "Workspace"
        }),
        Object.freeze({
            id: "ribbon",
            label: "Ribbon"
        }),
        Object.freeze({
            id: "intelligence",
            label: "Intelligence"
        }),
        Object.freeze({
            id: "system",
            label: "System"
        })
    ]);
