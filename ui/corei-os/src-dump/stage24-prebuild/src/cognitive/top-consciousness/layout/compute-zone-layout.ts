/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Compute Zone Layout
 * ============================================================================
 *
 * Purpose
 * -------
 * Computes the horizontal allocation for each Top Consciousness zone.
 *
 * This algorithm is deterministic.
 * It contains no rendering logic.
 * ============================================================================
 */

import type {

    RibbonModel,
    ZoneModel

} from "../models";

import type {

    ZoneLayoutModel

} from "./models";

import {

    RibbonMetrics

} from "./metrics";

/**
 * Compute layout for all ribbon zones.
 */
export function computeZoneLayout(

    ribbon: RibbonModel,

    ribbonWidth: number

): ZoneLayoutModel[] {

    const count =
        ribbon.zones.length;

    if (count === 0) {

        return [];

    }

    const availableWidth =

        ribbonWidth -

        (RibbonMetrics.ribbon.horizontalPadding * 2) -

        ((count - 1) * RibbonMetrics.ribbon.gap);

    const width = Math.max(

        RibbonMetrics.zone.minimumWidth,

        Math.floor(availableWidth / count)

    );

    let cursor =
        RibbonMetrics.ribbon.horizontalPadding;

    return ribbon.zones.map(

        (
            zone: ZoneModel,
            order: number
        ): ZoneLayoutModel => {

            const start = cursor;

            const end =
                start + width;

            cursor =
                end +
                RibbonMetrics.ribbon.gap;

            return {

                id: zone.id,

                order,

                width,

                start,

                end,

                widgets: []

            };

        }

    );

}
