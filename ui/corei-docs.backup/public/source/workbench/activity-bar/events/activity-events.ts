/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-01
 *
 * FILE
 * activity-events.ts
 *
 * PURPOSE
 * Activity Runtime Events
 * ============================================================================
 */

export const ActivityEvents = {

    SELECTED: "activity:selected",

    CHANGED: "activity:changed",

    HOVERED: "activity:hover",

    LEFT: "activity:left"

} as const;

export type ActivityEventType =

    typeof ActivityEvents[keyof typeof ActivityEvents];
