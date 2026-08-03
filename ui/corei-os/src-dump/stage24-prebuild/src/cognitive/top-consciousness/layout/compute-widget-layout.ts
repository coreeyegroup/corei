/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Compute Widget Layout
 * ============================================================================
 *
 * Purpose
 * -------
 * Computes widget placement inside a single ribbon zone.
 *
 * The algorithm is deterministic and renderer independent.
 * ============================================================================
 */

import type {
    ZoneModel,
    WidgetModel
} from "../models";

import type {
    WidgetLayoutModel
} from "./models";

import {
    RibbonMetrics
} from "./metrics";

/**
 * Compute widget layout for one zone.
 */
export function computeWidgetLayout(
    zone: ZoneModel
): WidgetLayoutModel[] {

    const count =
        zone.widgets.length;

    if (count === 0) {

        return [];

    }

    let cursor = 0;

    return zone.widgets.map(
        (
            widget: WidgetModel,
            order: number
        ): WidgetLayoutModel => {

            const width =
                RibbonMetrics.widget.defaultWidth;

            const layout: WidgetLayoutModel = {

                id: widget.id,

                order,

                visible: true,

                width,

                minWidth:
                    RibbonMetrics.widget.minimumWidth,

                maxWidth:
                    RibbonMetrics.widget.maximumWidth,

                x: cursor

            };

            cursor +=
                width +
                RibbonMetrics.widget.gap;

            return layout;

        }
    );

}
