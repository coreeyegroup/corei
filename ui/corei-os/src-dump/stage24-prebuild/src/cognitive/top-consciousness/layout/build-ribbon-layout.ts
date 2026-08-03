/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Build Ribbon Layout
 * ============================================================================
 *
 * Purpose
 * -------
 * Assembles the complete layout for the Top Consciousness ribbon.
 *
 * This builder coordinates the layout algorithms but contains no rendering
 * logic.
 * ============================================================================
 */

import type {
    RibbonModel
} from "../models";

import type {
    RibbonLayoutModel
} from "./models";

import {
    RibbonMetrics
} from "./metrics";

import {
    computeZoneLayout
} from "./compute-zone-layout";

import {
    computeWidgetLayout
} from "./compute-widget-layout";

/**
 * Build the complete ribbon layout.
 */
export function buildRibbonLayout(
    ribbon: RibbonModel,
    ribbonWidth: number
): RibbonLayoutModel {

    const zones =
        computeZoneLayout(
            ribbon,
            ribbonWidth
        );

    const computedZones =
        zones.map(zoneLayout => {

            const runtimeZone =
                ribbon.zones.find(
                    zone => zone.id === zoneLayout.id
                );

            return {

                ...zoneLayout,

                widgets: runtimeZone
                    ? computeWidgetLayout(runtimeZone)
                    : []

            };

        });

    return {

        width: ribbonWidth,

        height: RibbonMetrics.ribbon.height,

        zones: computedZones

    };

}
