/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness Runtime State
 * ============================================================================
 *
 * Purpose
 * -------
 * Represents the authoritative runtime state for the Top Consciousness
 * cognitive surface.
 *
 * This state belongs to the framework and is independent of any specific
 * experience (Infrastructure, Trading, Risk, etc.).
 * ============================================================================
 */

import type { RibbonModel } from "../models";

export type RibbonRuntimeMode =
    | "booting"
    | "ready"
    | "maintenance"
    | "replay";

export interface RibbonState {

    /**
     * Active Ribbon Definition.
     */
    ribbon: RibbonModel | null;

    /**
     * Framework initialization.
     */
    initialized: boolean;

    /**
     * Runtime loading state.
     */
    loading: boolean;

    /**
     * Runtime operating mode.
     */
    mode: RibbonRuntimeMode;

    /**
     * Active experience.
     */
    experience: string;

    /**
     * Active operational reality.
     */
    reality: string;

    /**
     * Runtime health.
     */
    health: "healthy" | "warning" | "critical";

    /**
     * Runtime version.
     */
    version: string;

    /**
     * Last runtime refresh.
     */
    lastUpdated: Date | null;

}

export const initialRibbonState: RibbonState = {

    ribbon: null,

    initialized: false,

    loading: false,

    mode: "booting",

    experience: "",

    reality: "",

    health: "healthy",

    version: "23.4.0",

    lastUpdated: null

};
