/**
 * =============================================================================
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-04
 *
 * FILE:
 * semantic.ts
 *
 * PURPOSE:
 * Institutional Semantic Color Language
 *
 * RESPONSIBILITY:
 * Maps authoritative RawColors into semantic roles consumed by the
 * COREI Operating System.
 *
 * DESIGN REFERENCES:
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • Binance Desktop
 *
 * DESIGN PRINCIPLES:
 * • High readability
 * • Strong surface hierarchy
 * • Minimal visual noise
 * • Operator-first ergonomics
 * • Gold reserved for institutional identity
 *
 * OWNERSHIP:
 * Foundation Layer
 *
 * =============================================================================
 */

import { RawColors } from "./raw";

export const SemanticColors = Object.freeze({

    background: {

        workspace:
            RawColors.black[900],

        application:
            RawColors.black[950],

        panel:
            RawColors.black[850],

        elevated:
            RawColors.black[800],

        floating:
            RawColors.black[750]

    },

    surface: {

        default: RawColors.black[850],

        hover: RawColors.black[750],

        active: RawColors.black[700],

        selected: RawColors.black[650]

    },

    border: {

        subtle: RawColors.black[700],

        divider: RawColors.black[650],

        default: RawColors.gray[500],

        strong: RawColors.gray[400],

        focus: RawColors.gold[500]

    },

    text: {

        primary: RawColors.white[100],

        secondary: RawColors.gray[200],

        muted: RawColors.gray[300],

        disabled: RawColors.gray[500],

        inverse: RawColors.black[950]

    },

    accent: {

        primary: RawColors.gold[500],

        hover: RawColors.gold[400],

        active: RawColors.gold[600],

        subtle: RawColors.gold[800]

    },

    status: {

        success: RawColors.green[500],

        warning: RawColors.orange[500],

        error: RawColors.red[500],

        info: RawColors.blue[500]

    }

} as const);

export type SemanticColorTokens = typeof SemanticColors;

