/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-012
 * File       : render-context.ts
 * Purpose    : Render Context Runtime Model
 * =============================================================================
 */

import type {

    RenderContextContract

} from "../contracts/render-context-contract";

export interface RenderContextModel extends RenderContextContract {

    readonly active: boolean;

}
