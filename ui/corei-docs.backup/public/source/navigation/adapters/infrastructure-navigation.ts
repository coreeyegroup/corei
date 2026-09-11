/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage : 25
 * Phase : 03
 * Step  : 04
 * Build  : 04.03
 *
 * File : infrastructure-navigation.ts
 * Purpose : Navigation Infrastructure Adapter
 * =============================================================================
 */

import { NavigationRegistry } from "../registry/navigation-registry";

/**
 * Infrastructure layer exposes a flattened / derived view
 * from NavigationModel (object-based registry).
 */
export const InfrastructureNavigation = NavigationRegistry.items[0];
