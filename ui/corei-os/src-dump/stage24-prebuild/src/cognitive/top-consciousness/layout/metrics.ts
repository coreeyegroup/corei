/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Layout Metrics
 * ============================================================================
 *
 * Purpose
 * -------
 * Institutional layout constants for the Top Consciousness surface.
 *
 * This file is the single source of truth for:
 *
 * • Ribbon dimensions
 * • Zone spacing
 * • Widget sizing
 * • Density
 * • Alignment metrics
 *
 * No layout algorithm should hardcode values.
 * ============================================================================
 */

export const RibbonMetrics = Object.freeze({

    ribbon: {

        height: 56,

        horizontalPadding: 16,

        verticalPadding: 8,

        gap: 8

    },

    zone: {

        minimumWidth: 180,

        defaultGap: 12

    },

    widget: {

        minimumWidth: 96,

        defaultWidth: 120,

        maximumWidth: 240,

        height: 36,

        gap: 8

    },

    density: {

        compact: 0.85,

        normal: 1.00,

        comfortable: 1.15

    }

});
