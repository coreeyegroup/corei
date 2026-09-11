/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-013
 * File       : visualization-state.ts
 * Purpose    : Visualization Runtime State
 * =============================================================================
 */

import { create } from "zustand";

import type {

    VisualizationModel

} from "../models/visualization";

import {

    VisualizationRegistry

} from "../registry/visualization-registry";

interface VisualizationState {

    readonly visualizations: readonly VisualizationModel[];

    readonly activeVisualization: string;

    activate(

        visualizationId: string

    ): void;

}

export const useVisualizationState = create<VisualizationState>()(

    (set) => ({

        visualizations: VisualizationRegistry,

        activeVisualization: "financial-chart",

        activate(

            visualizationId

        ) {

            set({

                activeVisualization: visualizationId

            });

        }

    })

);
