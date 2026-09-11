/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-004
 * File       : raw.ts
 * Purpose    : Authoritative Raw Color Tokens
 * =============================================================================
 */

export const RawColors = Object.freeze({

    black: {

        /*
        * VS Code / Bloomberg inspired graphite surface hierarchy
        *
        * 950 : application base
        * 900 : workspace
        * 850 : panel
        * 800 : elevated surface
        * 750 : hover
        * 700 : active
        * 650 : selected
        * 600 : strongest neutral
        */

        950: "#111111",

        900: "#181818",

        850: "#1E1E1E",

        800: "#252526",

        750: "#2A2D2E",

        700: "#303030",

        650: "#37373D",

        600: "#414141"

    },

    gray: {
        500: "#5E5E5E",
        400: "#7A7A7A",
        300: "#9A9A9A",
        200: "#C4C4C4",
        100: "#E5E5E5"
    },

    white: {
        100: "#FFFFFF"
    },

    gold: {
        900: "#5F4B1B",
        800: "#7A6123",
        700: "#94772B",
        600: "#AE8E33",
        500: "#C8A53B",
        400: "#D8B85A",
        300: "#E7CC7E",
        200: "#F2DFA5",
        100: "#FAF0D1"
    },

    green: {
        600: "#00C853",
        500: "#00E676",
        400: "#69F0AE"
    },

    red: {
        600: "#D50000",
        500: "#FF1744",
        400: "#FF616F"
    },

    blue: {
        600: "#1565C0",
        500: "#1E88E5",
        400: "#64B5F6"
    },

    orange: {
        500: "#FF9800"
    }

} as const);

export type RawColorTokens = typeof RawColors;
