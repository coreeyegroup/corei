/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 03
 * Step        : 08
 * Build Unit  : 08.03
 *
 * Module      : navigation-adapter
 * Layer       : Adapter
 *
 * Responsibility:
 * Converts navigation actions into system events
 *
 * Architecture Role:
 * Navigation → Event Stream
 *
 * Dependencies:
 * - Integration Engine
 *
 * State Model:
 * Event-driven | deterministic | immutable propagation
 * =============================================================================
 */

import { IntegrationEngine } from "../engine/integration-engine";

export class NavigationAdapter {

    static onChange(navigationId: string) {

        return IntegrationEngine.dispatch(
            "NAVIGATION_CHANGE",
            "NAVIGATION",
            { navigationId }
        );

    }

}
