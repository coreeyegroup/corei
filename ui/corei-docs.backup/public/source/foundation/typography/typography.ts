/**
 * =============================================================================
 * COREI Operating System
 *
 * Stage-25
 * Phase-17
 * Step-01
 *
 * File:
 * typography.ts
 *
 * Purpose:
 * Institutional Typography Language
 *
 * Visual Reference:
 * VS Code
 * Bloomberg Terminal
 * TradingView Desktop
 * Binance Desktop
 *
 * =============================================================================
 */

export const Typography = Object.freeze({

    fontFamily: {

        primary:
            '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',

        monospace:
            '"JetBrains Mono", "Cascadia Code", Consolas, monospace'

    },

    fontSize: {

        caption: "10px",

        table: "11px",

        ui: "12px",

        body: "12px",

        subtitle: "13px",

        title: "16px",

        pageTitle: "18px"

    },

    fontWeight: {

        regular: 400,

        medium: 500,

        semibold: 600,

        bold: 700

    },

    lineHeight: {

        compact: 1.25,

        normal: 1.45,

        relaxed: 1.65

    },

    letterSpacing: {

        tight: "-0.01em",

        normal: "0",

        wide: "0.02em"

    }

} as const);

export type TypographyTokens = typeof Typography;
