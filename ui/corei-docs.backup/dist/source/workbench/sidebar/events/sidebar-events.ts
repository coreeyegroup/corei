/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-03
 *
 * Sidebar Events
 * ============================================================================
 */

export const SidebarEvents = {

    OPENED: "sidebar:opened",

    CLOSED: "sidebar:closed",

    TOGGLED: "sidebar:toggled",

    RESIZED: "sidebar:resized"

} as const;

export type SidebarEventType =

typeof SidebarEvents[keyof typeof SidebarEvents];
