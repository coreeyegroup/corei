/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-24
 *
 * FILE:
 * playwright.config.ts
 *
 * PURPOSE:
 * Cross-Browser and Viewport Validation Harness Configuration
 *
 * DESCRIPTION:
 * Defines the deterministic browser execution boundary for validating the
 * Institutional Shell across the authoritative Step-24 browser matrix.
 *
 * OWNERSHIP:
 * COREI OS application validation infrastructure.
 *
 * ARCHITECTURE BOUNDARY:
 * This configuration does not own application runtime behavior.
 * This configuration does not modify Shell architecture.
 * This configuration does not define responsive breakpoints.
 *
 ******************************************************************************/

import {
    defineConfig,
    devices
} from "@playwright/test";


/*=============================================================================
    VALIDATION SERVER CONTRACT
=============================================================================*/

const validationHost =
    "127.0.0.1";

const validationPort =
    4173;

const validationBaseURL =
    `http://${validationHost}:${validationPort}`;


/*=============================================================================
    PLAYWRIGHT VALIDATION CONFIGURATION
=============================================================================*/

export default defineConfig({

    testDir:
        "./tests/browser",

    fullyParallel:
        false,

    forbidOnly:
        true,

    retries:
        0,

    workers:
        1,

    reporter: [
        [
            "list"
        ],
        [
            "html",
            {
                outputFolder:
                    "playwright-report",

                open:
                    "never"
            }
        ]
    ],

    outputDir:
        "test-results",

    use: {

        baseURL:
            validationBaseURL,

        trace:
            "retain-on-failure",

        screenshot:
            "only-on-failure",

        video:
            "retain-on-failure"

    },

    projects: [

        {
            name:
                "chromium",

            use: {
                ...devices[
                    "Desktop Chrome"
                ]
            }
        },

        {
            name:
                "firefox",

            use: {
                ...devices[
                    "Desktop Firefox"
                ]
            }
        },

        {
            name:
                "webkit",

            use: {
                ...devices[
                    "Desktop Safari"
                ]
            }
        }

    ],

    webServer: {

        command:
            `pnpm preview --host ${validationHost} --port ${validationPort}`,

        url:
            validationBaseURL,

        reuseExistingServer:
            false,

        timeout:
            120000

    }

});
