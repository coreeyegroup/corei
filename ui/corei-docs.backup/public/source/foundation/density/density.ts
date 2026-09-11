/**
 * =============================================================================
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-02
 *
 * FILE:
 * density.ts
 *
 * PURPOSE:
 * Institutional Information Density Language
 *
 * RESPONSIBILITY:
 * Defines the authoritative density system consumed by all COREI UX
 * surfaces.
 *
 * DESIGN REFERENCES:
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • Binance Desktop
 *
 * DESIGN PRINCIPLES:
 * • Maximum information density
 * • Long-session operator comfort
 * • Minimal wasted pixels
 * • Consistent vertical rhythm
 * * No dashboard spacing
 *
 * OWNERSHIP:
 * Foundation Layer
 *
 * =============================================================================
 */

export const DensityTokens = Object.freeze({

    mode: {

        compact: "density-compact",

        standard: "density-standard",

        expanded: "density-expanded"

    },

    spacing: {

        compact: {

            panelGap: "2px",

            contentGap: "4px",

            sectionGap: "6px"

        },

        standard: {

            panelGap: "4px",

            contentGap: "6px",

            sectionGap: "10px"

        },

        expanded: {

            panelGap: "8px",

            contentGap: "10px",

            sectionGap: "14px"

        }

    },

    row: {

        compact: "22px",

        standard: "24px",

        expanded: "28px"

    },

    control: {

        compact: "26px",

        standard: "30px",

        expanded: "34px"

    },

    ribbon: {

        compact: "40px",

        standard: "42px",

        expanded: "46px"

    },

    statusBar: {

        compact: "22px",

        standard: "24px",

        expanded: "28px"

    },

    tab: {

        compact: "30px",

        standard: "32px",

        expanded: "36px"

    },

    tree: {

        compact: "22px",

        standard: "24px",

        expanded: "28px"

    },

    table: {

        compact: "22px",

        standard: "24px",

        expanded: "28px"

    }

} as const);

export type DensityTokensType = typeof DensityTokens;
