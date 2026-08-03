/**
 * ============================================================================
 * COREI Operating System
 * Top Consciousness Ribbon Registry
 * ============================================================================
 *
 * Purpose
 * -------
 * Runtime registry responsible for managing the active Ribbon configuration.
 * ============================================================================
 */

import type { RibbonModel } from "../models";

class RibbonRegistry {

    private ribbon: RibbonModel | null = null;

    register(ribbon: RibbonModel): void {

        this.ribbon = ribbon;

    }

    unregister(): void {

        this.ribbon = null;

    }

    get(): RibbonModel | null {

        return this.ribbon;

    }

    isRegistered(): boolean {

        return this.ribbon !== null;

    }

}

export const ribbonRegistry = new RibbonRegistry();

