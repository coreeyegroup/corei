/**
 * =============================================================================
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05
 *
 * FILE:
 * elevation.ts
 *
 * PURPOSE:
 * Institutional Elevation Language
 *
 * RESPONSIBILITY:
 * Defines the authoritative elevation tokens for the COREI Operating
 * System. Elevation is intentionally restrained and exists only to
 * communicate operational layer hierarchy.
 *
 * DESIGN REFERENCES:
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • JetBrains IDE
 *
 * DESIGN PRINCIPLES:
 * • Flat-first interface
 * • Shadow only when meaningful
 * • No decorative depth
 * • Long-session operator comfort
 * • Professional workstation appearance
 *
 * OWNERSHIP:
 * Foundation Layer
 *
 * =============================================================================
 */

export const Elevation = Object.freeze({

    flat: "none",

    inset:
        "inset 0 1px 0 rgba(255,255,255,0.02)",

    low:
        "0 1px 2px rgba(0,0,0,0.22)",

    medium:
        "0 3px 8px rgba(0,0,0,0.28)",

    high:
        "0 8px 20px rgba(0,0,0,0.36)",

    overlay:
        "0 12px 32px rgba(0,0,0,0.42)",

    modal:
        "0 18px 48px rgba(0,0,0,0.50)"

} as const);

export type ElevationTokens = typeof Elevation;

