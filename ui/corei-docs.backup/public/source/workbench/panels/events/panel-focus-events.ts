/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-05
 *
 * FILE
 * panel-focus-events.ts
 * ============================================================================
 */

export const PanelFocusEvents = {

    FOCUSED: "panel:focused",

    BLURRED: "panel:blurred",

    CHANGED: "panel:focus:changed"

} as const;

export type PanelFocusEventType =

typeof PanelFocusEvents[keyof typeof PanelFocusEvents];
