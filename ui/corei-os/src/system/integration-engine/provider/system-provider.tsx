/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 08
 * Build Unit  : 08.08
 *
 * Module      : system-provider
 * Layer       : Provider
 *
 * Responsibility:
 * React boundary exposing system runtime interface
 *
 * Architecture Role:
 * UI → System Runtime Bridge
 *
 * Dependencies:
 * - System Runtime
 *
 * State Model:
 * Event-driven | deterministic | immutable propagation
 * =============================================================================
 */

import React, { createContext, useContext } from "react";
import { SystemRuntime } from "../runtime/system-runtime";

const SystemContext = createContext<any>(null);

export const SystemProvider = ({ children }: any) => {

    return (
        <SystemContext.Provider value={SystemRuntime}>
            {children}
        </SystemContext.Provider>
    );

};

export const useSystem = () => useContext(SystemContext);
