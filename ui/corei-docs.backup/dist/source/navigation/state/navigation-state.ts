/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage : 25
 * Phase : 03
 * Step  : 04
 * Build  : 04.02
 *
 * File : navigation-state.ts
 * Purpose : Navigation Runtime State (Aligned)
 * =============================================================================
 */

import { create } from "zustand";

import type { NavigationModel } from "../models/navigation";
import { NavigationRegistry } from "../registry/navigation-registry";

interface NavigationState {

    readonly navigations: NavigationModel;

    readonly activeNavigation: string;

    activate(navigationId: string): void;

}

export const useNavigationState = create<NavigationState>()((set) => ({

    navigations: NavigationRegistry,

    activeNavigation: "infrastructure",

    activate(navigationId: string) {

        set({
            activeNavigation: navigationId
        });

    }

}));
