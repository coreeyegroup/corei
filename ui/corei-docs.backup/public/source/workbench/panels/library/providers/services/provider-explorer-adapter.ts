/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 *
 * Component   : Provider Explorer
 * File        : provider-explorer-adapter.ts
 *
 * Purpose
 * -------
 * Adapts the Provider Platform into immutable view models
 * for the Provider Explorer.
 *
 * Repository Reality
 * ------------------
 * Current Provider Platform exposes:
 *
 *  id
 *  name
 *  version
 *  vendor
 *  enabled
 *
 * =============================================================================
 */

import {
    ProviderManager,
    type ProviderModel,
} from "@/providers";

export interface ProviderExplorerItem {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly vendor: string;
    readonly enabled: boolean;
    readonly type: string;
    readonly runtimeStatus: string;
}

export class ProviderExplorerAdapter {
    private readonly manager = new ProviderManager();

    public load(): readonly ProviderExplorerItem[] {
        return this.manager
            .getAll()
            .map(this.toItem)
            .sort(this.sortAlphabetically);
    }

    public search(text: string): readonly ProviderExplorerItem[] {
        const keyword = text.trim().toLowerCase();
        if (!keyword.length) {
            return this.load();
        }
        return this.load().filter(
            provider =>
                provider.id.toLowerCase().includes(keyword) ||
                provider.name.toLowerCase().includes(keyword) ||
                provider.vendor.toLowerCase().includes(keyword) ||
                provider.version.toLowerCase().includes(keyword)
        );
    }

    private readonly toItem = (provider: ProviderModel): ProviderExplorerItem => ({
        id: provider.id,
        name: provider.name,
        version: provider.version,
        vendor: provider.vendor,
        enabled: provider.enabled,
        type: "UI", // default, could be derived from registry
        runtimeStatus: "Operational", // default
    });

    private readonly sortAlphabetically = (left: ProviderExplorerItem, right: ProviderExplorerItem): number =>
        left.name.localeCompare(right.name);
}

export const providerExplorerAdapter = new ProviderExplorerAdapter();
