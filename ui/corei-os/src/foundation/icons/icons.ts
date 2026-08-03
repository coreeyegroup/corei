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
 * STEP-01.7 — Icon Sizing System
 *
 * FILE
 * src/foundation/icons/icons.ts
 *
 * OWNER
 * Foundation
 *
 * PURPOSE
 * Defines the institutional icon sizing system used throughout the
 * COREI Operating System.
 *
 * RESPONSIBILITIES
 * • Icon Size Scale
 * • Component Icon Standards
 * • Visual Consistency
 *
 * DESIGN REFERENCES
 * • Visual Studio Code
 * • Bloomberg Terminal
 * • TradingView Desktop
 * • Binance Desktop
 *
 * AUTHORITY
 * This file is the single source of truth for all icon sizes.
 * Components must consume this module and must never define icon
 * dimensions locally.
 *
 ******************************************************************************/

export const IconTokens = Object.freeze({

    scale: {

        xs: 12,

        sm: 14,

        md: 16,

        lg: 18,

        xl: 20,

        xxl: 24,

        xxxl: 32

    },

    component: {

        ribbon: 16,

        toolbar: 16,

        activityBar: 20,

        sidebar: 16,

        navigation: 16,

        workspaceTab: 14,

        statusBar: 14,

        panelHeader: 16,

        tree: 16,

        table: 14,

        button: 16,

        input: 16,

        dropdown: 16,

        dialog: 18,

        notification: 18,

        commandPalette: 16

    }

});

export type IconTokensContract =
    typeof IconTokens;
