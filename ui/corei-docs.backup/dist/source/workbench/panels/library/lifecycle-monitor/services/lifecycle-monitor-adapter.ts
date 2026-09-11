/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * Component   : Lifecycle Monitor
 * File        : lifecycle-monitor-adapter.ts
 * =============================================================================
 */

import { ProviderManager, type ProviderModel } from "@/providers";

export interface LifecycleMonitorItem {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly state: "REGISTERED" | "INITIALIZED" | "ACTIVE" | "INACTIVE";
  readonly active: boolean;
  readonly initialized: boolean;
  readonly loaded: boolean;
}

export class LifecycleMonitorAdapter {
  private readonly providerManager = new ProviderManager();

  public load(): readonly LifecycleMonitorItem[] {
    const providers = this.providerManager.getAll();
    return providers.map(provider => ({
      id: provider.id,
      name: provider.name,
      type: provider.vendor || "Provider",
      state: "ACTIVE", // placeholder – would come from runtime
      active: provider.enabled ?? true,
      initialized: true, // placeholder
      loaded: true,      // placeholder
    }));
  }

  public search(text: string): readonly LifecycleMonitorItem[] {
    const keyword = text.trim().toLowerCase();
    if (!keyword.length) return this.load();
    return this.load().filter(
      item =>
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword)
    );
  }
}

export const lifecycleMonitorAdapter = new LifecycleMonitorAdapter();
