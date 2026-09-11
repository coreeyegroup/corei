/**
 * =============================================================================
 * COREI Operating Environment
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 02
 * Build Unit  : 02.07
 *
 * File        : viewport-layout.ts
 * Purpose     : Institutional Viewport Layout
 * =============================================================================
 */

export interface ViewportLayout {

    readonly width: string;

    readonly height: string;

}

export const DefaultViewportLayout: Readonly<ViewportLayout> = {

    width: "100%",

    height: "100%"

};
