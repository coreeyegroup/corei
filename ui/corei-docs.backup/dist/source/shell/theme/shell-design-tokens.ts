/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-07
 *
 * FILE:
 * shell-design-tokens.ts
 *
 * PURPOSE:
 * Institutional Shell Design Token Consumption
 *
 * RESPONSIBILITY:
 * Consumes Foundation visual tokens and exposes them to the Shell.
 * This layer owns no visual values and introduces no new design tokens.
 *
 * DESIGN REFERENCES:
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • Binance Desktop
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import {
    SemanticColors
} from "../../foundation/colors";

import {
    Typography
} from "../../foundation/typography";

import {
    Spacing
} from "../../foundation/spacing";

import {
    DensityTokens
} from "../../foundation/density";

import {
    Elevation
} from "../../foundation/elevation";

export const SHELL_DESIGN_TOKENS = Object.freeze({

    colors: SemanticColors,

    typography: Typography,

    spacing: Spacing,

    density: DensityTokens,

    elevation: Elevation,

    surfaces: {

        workspace:
            SemanticColors.background.workspace,

        application:
            SemanticColors.background.application,

        panel:
            SemanticColors.background.panel,

        elevated:
            SemanticColors.background.elevated,

        floating:
            SemanticColors.background.floating

    },

    text: SemanticColors.text,

    accent: SemanticColors.accent,

    border: SemanticColors.border,

    status: SemanticColors.status

});

export type ShellDesignTokens =
    typeof SHELL_DESIGN_TOKENS;
