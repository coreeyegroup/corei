/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-24
 *
 * FILE:
 * shell-viewport.spec.ts
 *
 * PURPOSE:
 * Cross-Browser Institutional Shell Viewport Validation
 *
 * DESCRIPTION:
 * Defines the frozen Step-24 viewport matrix and validates the browser-visible
 * structural invariants of the Institutional Shell.
 *
 * OWNERSHIP:
 * COREI OS application validation infrastructure.
 *
 * ARCHITECTURE BOUNDARY:
 * This test consumes the existing Shell.
 * This test does not own Shell architecture.
 * This test does not redefine responsive breakpoints.
 * This test does not mutate application source.
 *
 ******************************************************************************/

import {
    expect,
    test,
    type Page
} from "@playwright/test";


/*=============================================================================
    AUTHORITATIVE VIEWPORT MATRIX
=============================================================================*/

interface ShellViewport {

    readonly name:
        string;

    readonly width:
        number;

    readonly height:
        number;

}

const shellViewportMatrix:
    readonly ShellViewport[] = [

        {
            name:
                "wide-operational",

            width:
                1920,

            height:
                1080
        },

        {
            name:
                "standard-operational",

            width:
                1440,

            height:
                900
        },

        {
            name:
                "compact-width-boundary",

            width:
                1280,

            height:
                800
        },

        {
            name:
                "narrow-width-boundary",

            width:
                1180,

            height:
                800
        },

        {
            name:
                "intermediate-narrow",

            width:
                960,

            height:
                760
        },

        {
            name:
                "minimum-width-boundary",

            width:
                900,

            height:
                700
        },

        {
            name:
                "compact-height-boundary",

            width:
                1440,

            height:
                760
        },

        {
            name:
                "intermediate-height",

            width:
                1280,

            height:
                700
        },

        {
            name:
                "minimum-height-boundary",

            width:
                1180,

            height:
                620
        }

    ];


/*=============================================================================
    AUTHORITATIVE SHELL SELECTORS
=============================================================================*/

const shellSelectors = {

    frame:
        ".corei-shell-frame",

    layout:
        ".corei-shell-layout",

    top:
        ".shell-top",

    left:
        ".shell-left",

    center:
        ".shell-center",

    right:
        ".shell-right",

    bottom:
        ".shell-bottom",

    status:
        ".shell-status"

} as const;


/*=============================================================================
    SHELL RUNTIME VALIDATION
=============================================================================*/

async function validateShellRuntime(
    page:
        Page
): Promise<void> {

    const frame =
        page.locator(
            shellSelectors.frame
        );

    const layout =
        page.locator(
            shellSelectors.layout
        );

    await expect(
        frame
    ).toHaveCount(
        1
    );

    await expect(
        layout
    ).toHaveCount(
        1
    );

    await expect(
        frame
    ).toBeVisible();

    await expect(
        layout
    ).toBeVisible();

    for (
        const selector
        of Object.values(
            shellSelectors
        )
    ) {

        await expect(
            page.locator(
                selector
            )
        ).toHaveCount(
            1
        );

    }

    const frameBox =
        await frame.boundingBox();

    const layoutBox =
        await layout.boundingBox();

    expect(
        frameBox
    ).not.toBeNull();

    expect(
        layoutBox
    ).not.toBeNull();

    expect(
        frameBox!.width
    ).toBeGreaterThan(
        0
    );

    expect(
        frameBox!.height
    ).toBeGreaterThan(
        0
    );

    expect(
        layoutBox!.width
    ).toBeGreaterThan(
        0
    );

    expect(
        layoutBox!.height
    ).toBeGreaterThan(
        0
    );

    const documentOverflow =
        await page.evaluate(
            () => ({

                horizontal:
                    document.documentElement.scrollWidth
                    >
                    document.documentElement.clientWidth,

                vertical:
                    document.documentElement.scrollHeight
                    >
                    document.documentElement.clientHeight

            })
        );

    expect(
        documentOverflow.horizontal
    ).toBe(
        false
    );

    expect(
        documentOverflow.vertical
    ).toBe(
        false
    );

}


/*=============================================================================
    FROZEN VIEWPORT EXECUTION MATRIX
=============================================================================*/

for (
    const viewport
    of shellViewportMatrix
) {

    test.describe(
        viewport.name,
        () => {

            test.use({

                viewport: {

                    width:
                        viewport.width,

                    height:
                        viewport.height

                }

            });

            test(
                "preserves institutional shell runtime invariants",
                async ({
                    page
                }) => {

                    await page.goto(
                        "/"
                    );

                    await validateShellRuntime(
                        page
                    );

                }
            );

        }
    );

}
