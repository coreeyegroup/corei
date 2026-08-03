/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness
 * Layout Engine
 * ============================================================================
 *
 * Purpose
 * -------
 * Public entry point for the Top Consciousness layout engine.
 *
 * Consumers interact only with this engine.
 * Internal algorithms remain private implementation details.
 * ============================================================================
 */

import type {
    RibbonModel
} from "../models";

import type {
    RibbonLayoutModel
} from "./models";

import {
    buildRibbonLayout
} from "./build-ribbon-layout";

/**
 * ============================================================================
 * Layout Engine
 * ============================================================================
 */

export class TopConsciousnessLayoutEngine {

    /**
     * Compute the complete ribbon layout.
     */
    public build(

        ribbon: RibbonModel,

        ribbonWidth: number

    ): RibbonLayoutModel {

        return buildRibbonLayout(

            ribbon,

            ribbonWidth

        );

    }

}

/**
 * Singleton engine.
 */

export const topConsciousnessLayoutEngine =
    new TopConsciousnessLayoutEngine();
