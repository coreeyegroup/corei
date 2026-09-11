/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-012
 * File       : render-runtime.ts
 * Purpose    : Rendering Runtime
 * =============================================================================
 */

export interface RenderRuntime {

    readonly initialized: boolean;

    readonly loaded: boolean;

}

export const DefaultRenderRuntime: RenderRuntime = {

    initialized: false,

    loaded: false

};
