/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-04
 *
 * FILE:
 * main.tsx
 *
 * PURPOSE:
 * COREI Browser Application Entry Point
 *
 * DESCRIPTION:
 * Establishes the authoritative browser entry boundary for COREI.
 *
 * The browser entry point is responsible only for mounting the application
 * composition root into the browser DOM.
 *
 * It does not construct Platform Kernel services.
 * It does not access Platform Kernel implementations.
 * It does not compose the Institutional Shell.
 * It does not own application bootstrap logic.
 *
 * All application composition is consumed through the Application Public API.
 *
 * OWNERSHIP:
 * COREI Application Platform
 *
 ******************************************************************************/

import React
from "react";

import ReactDOM
from "react-dom/client";

import "./index.css";

import {
    App
} from "./app";

/*=============================================================================
    BROWSER ROOT
=============================================================================*/

const rootElement =
    document.getElementById("root");

if (!rootElement) {

    throw new Error(
        "COREI browser root element '#root' was not found."
    );

}

/*=============================================================================
    APPLICATION MOUNT
=============================================================================*/

ReactDOM
    .createRoot(rootElement)
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
