/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 04
 *
 * File        : monaco-provider.ts
 * Purpose     : Monaco Provider Definition
 * =============================================================================
 */

import type {

    UIProviderModel

} from "../../../ui/models/ui-provider";

export const MonacoProvider: UIProviderModel = {

    id: "provider.ui.monaco",

    name: "Monaco Editor",

    category: "editor",

    version: "pending",

    enabled: false

};
