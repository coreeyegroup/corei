/*
============================================================
COREI
Top Ribbon Default State
------------------------------------------------------------
Phase : 23
Layer : Shell
Component : Top Ribbon
============================================================
*/

import type {
  TopRibbonContract
} from "../contracts/top-ribbon.contract";

export const DEFAULT_TOP_RIBBON_STATE: TopRibbonContract = {

  identity: {

    application: "COREI",

    terminal: "INFRASTRUCTURE TERMINAL",

    currentDomain: "D11 PLATFORM INTELLIGENCE"

  },

  environment: {

    environment: "PROD",

    region: "GLOBAL",

    utcTime: ""

  },

  platform: {

    connection: "CONNECTED",

    healthState: "HEALTHY",

    healthPercent: 100

  },

  commandBar: {

    terminalSwitcher: "TERMINAL",

    command: "COMMAND",

    workspace: "WORKSPACE",

    view: "VIEW",

    search: "SEARCH"

  },

  awareness: {

    criticalAlerts: 0,

    highAlerts: 0,

    mediumAlerts: 0,

    eventRate: "0/s",

    latency: "0 ms"

  },

  operator: {

    user: "PLATFORM_ADMIN",

    role: "ADMIN"

  }

};
