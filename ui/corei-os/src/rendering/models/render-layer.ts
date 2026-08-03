/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-012
 * File       : render-layer.ts
 * Purpose    : Render Layer Model
 * =============================================================================
 */

import type {

    RenderLayerContract

} from "../contracts/render-layer-contract";

export interface RenderLayerModel extends RenderLayerContract {

    readonly visible: boolean;

}
