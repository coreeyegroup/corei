/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE
 * explorer-events.ts
 *
 * PURPOSE
 * Explorer Runtime Events
 * ============================================================================
 */

export const ExplorerEvents = {

    SELECTED: "explorer:selected",

    TOGGLED: "explorer:toggled",

    EXPANDED: "explorer:expanded",

    COLLAPSED: "explorer:collapsed",

    REFRESHED: "explorer:refreshed"

} as const;

export type ExplorerEventType =
    typeof ExplorerEvents[keyof typeof ExplorerEvents];
