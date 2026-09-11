/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 01
 *
 * File        : provider-manager.ts
 * Purpose     : Provider Manager
 * =============================================================================
 */

import {

    ProviderRegistry

} from "../registry/provider-registry";

import type {

    ProviderModel

} from "../models/provider";

export class ProviderManager {

    public getAll(): readonly ProviderModel[] {

        return ProviderRegistry;

    }

}
