/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 08
 *
 * File        : echarts-provider.ts
 * Purpose     : ECharts Provider Definition
 * =============================================================================
 */

import type {

    UIProviderModel

} from "../../../ui/models/ui-provider";

export const EChartsProvider: UIProviderModel = {

    id: "provider.ui.echarts",

    name: "Apache ECharts",

    category: "chart",

    version: "pending",

    enabled: false

};
