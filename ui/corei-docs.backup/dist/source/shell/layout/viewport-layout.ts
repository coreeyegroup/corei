/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-005
 * File       : viewport-layout.ts
 * Purpose    : Browser Viewport Layout
 * =============================================================================
 */

export interface ViewportLayout {

    readonly width: number;

    readonly height: number;

}

export function createViewportLayout(): ViewportLayout {

    return {

        width: window.innerWidth,

        height: window.innerHeight

    };

}
