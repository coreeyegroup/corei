/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 04
 * Step        : 03
 *
 * File        : ui-provider-manager.ts
 * Purpose     : UI Provider Manager
 * =============================================================================
 */

import type { UIProviderModel } from "../models/ui-provider";
import { UIProviderRegistry } from "../registry/ui-provider-registry";

export class UIProviderManager {

    public register(
        provider: UIProviderModel
    ): void {

        (UIProviderRegistry as UIProviderModel[]).push(provider);

    }

    public getAll(): readonly UIProviderModel[] {

        return UIProviderRegistry;

    }

    public findById(
        id: string
    ): UIProviderModel | undefined {

        return UIProviderRegistry.find(

            provider => provider.id === id

        );

    }

}
