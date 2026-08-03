/**
 * =============================================================================
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-03
 *
 * FILE:
 * spacing.ts
 *
 * PURPOSE:
 * Institutional Spatial Language
 *
 * RESPONSIBILITY:
 * Defines the authoritative spacing scale consumed throughout the
 * COREI Operating System.
 *
 * DESIGN REFERENCES:
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • Binance Desktop
 *
 * DESIGN PRINCIPLES:
 * • Compact operator workspace
 * • Minimal wasted pixels
 * • Predictable spatial rhythm
 * • Consistent alignment
 * • Long-session usability
 *
 * OWNERSHIP:
 * Foundation Layer
 *
 * =============================================================================
 */

export const Spacing = Object.freeze({

    none: "0px",

    hairline: "1px",

    xxs: "2px",

    xs: "4px",

    sm: "6px",

    md: "8px",

    lg: "12px",

    xl: "16px",

    xxl: "20px",

    xxxl: "24px",

    workspaceGap: "4px",

    panelGap: "4px",

    sectionGap: "8px",

    contentGap: "6px",

    controlGap: "4px",

    panelPadding: "8px",

    cardPadding: "8px",

    dialogPadding: "16px",

    windowPadding: "12px",

    ribbonHeight: "42px",

    toolbarHeight: "30px",

    statusbarHeight: "24px",

    tabHeight: "32px",

    sidebarWidth: "280px",

    inspectorWidth: "360px",

    timelineHeight: "220px"

} as const);

export type SpacingTokens = typeof Spacing;
