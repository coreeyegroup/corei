/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-10
 * Build Unit : 03
 * File       : monitor-configuration.ts
 * Purpose    : Institutional Monitor Configuration
 * =============================================================================
 */

import type {

    MonitorModel

} from "../models";

export const MonitorConfiguration: Readonly<MonitorModel> = {

    id: "corei-monitor",

    name: "COREI Primary Monitor",

    initialized: false,

    attached: false,

    active: false

};
