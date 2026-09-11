/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 06
 *
 * File        : xterm-provider.ts
 * Purpose     : xterm.js Provider Definition
 * =============================================================================
 */

import type {

    UIProviderModel

} from "../../../ui/models/ui-provider";

export const XtermProvider: UIProviderModel = {

    id: "provider.ui.xterm",

    name: "xterm.js",

    category: "terminal",

    version: "pending",

    enabled: false

};
