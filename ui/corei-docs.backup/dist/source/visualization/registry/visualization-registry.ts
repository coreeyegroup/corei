/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-013
 * File       : visualization-registry.ts
 * Purpose    : Institutional Visualization Registry
 * =============================================================================
 */

import type {

    VisualizationModel

} from "../models/visualization";

export const VisualizationRegistry: readonly VisualizationModel[] = [

    {

        id: "financial-chart",

        title: "Financial Chart",

        engine: "chart",

        enabled: true,

        visible: true

    },

    {

        id: "analytics-dashboard",

        title: "Analytics Dashboard",

        engine: "echarts",

        enabled: true,

        visible: true

    },

    {

        id: "workflow",

        title: "Workflow",

        engine: "flow",

        enabled: true,

        visible: true

    }

];
