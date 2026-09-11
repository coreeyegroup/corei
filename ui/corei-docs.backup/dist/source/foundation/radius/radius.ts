/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE
 * Stage-25
 *
 * PHASE
 * Phase-17 — Institutional Design Language
 *
 * STEP
 * STEP-01.6 — Radius System
 *
 * FILE
 * src/foundation/radius/radius.ts
 *
 * OWNER
 * Foundation
 *
 * PURPOSE
 * Defines the institutional corner radius system used across the
 * COREI Operating System.
 *
 * RESPONSIBILITIES
 * • Radius Scale
 * • Component Radius Standards
 * • Visual Consistency
 *
 * DESIGN REFERENCES
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • Binance Desktop
 *
 * AUTHORITY
 * This file is the single source of truth for all corner radius
 * values. Components must consume this module and must not define
 * local radius values.
 *
 ******************************************************************************/

export const RadiusTokens = Object.freeze({

    scale: {

        none: 0,

        xs: 2,

        sm: 4,

        md: 6,

        lg: 8,

        xl: 12

    },

    component: {

        workspace: 0,

        ribbon: 0,

        activityBar: 0,

        sidebar: 0,

        panel: 0,

        statusBar: 0,

        toolbar: 2,

        button: 2,

        input: 2,

        tab: 2,

        dropdown: 4,

        menu: 4,

        dialog: 6,

        modal: 8,

        tooltip: 4

    }

});

export type RadiusTokensContract =
    typeof RadiusTokens;
