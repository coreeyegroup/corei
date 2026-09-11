/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-012
 * File       : render.ts
 * Purpose    : Render Runtime Model
 * =============================================================================
 */

import type {

    RenderContract

} from "../contracts/render-contract";

export interface RenderModel extends RenderContract {

    readonly visible: boolean;

    readonly enabled: boolean;

}
