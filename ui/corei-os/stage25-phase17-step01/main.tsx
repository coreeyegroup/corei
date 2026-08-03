/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01 - Platform Bootstrap
 * Step        : 01.08 - Bootstrap Activation
 *
 * File        : main.tsx
 * Purpose     : Authoritative browser entry point for COREI.
 *
 * Copyright (c) Core Eye Systems.
 * Confidential & Proprietary.
 * =============================================================================
 */

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { bootstrap } from "./foundation/bootstrap";
import { App } from "./app/App";
import { AppProvider } from "./app/AppProvider";

/**
 * Start the COREI platform.
 */
bootstrap.start();

ReactDOM
    .createRoot(document.getElementById("root")!)
    .render(
        <React.StrictMode>
            <AppProvider>
                <App />
            </AppProvider>
        </React.StrictMode>
    );
