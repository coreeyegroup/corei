/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-013
 * File       : visualization.ts
 * Purpose    : Visualization Runtime Model
 * =============================================================================
 */

import type {

    VisualizationContract

} from "../contracts/visualization-contract";

export interface VisualizationModel extends VisualizationContract {

    readonly enabled: boolean;

    readonly visible: boolean;

}
