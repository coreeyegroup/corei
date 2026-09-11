/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * Component   : Runtime Monitor
 * File        : runtime-monitor-adapter.ts
 * =============================================================================
 */

import { ProviderManager, type ProviderModel } from "@/providers";

export interface RuntimeMonitorItem {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly state: "INITIALIZED" | "LOADED" | "ACTIVE" | "INACTIVE" | "ERROR";
  readonly initialized: boolean;
  readonly loaded: boolean;
  readonly active: boolean;
}

export class RuntimeMonitorAdapter {
  private readonly providerManager = new ProviderManager();

  public load(): readonly RuntimeMonitorItem[] {
    const providers = this.providerManager.getAll();
    // In a real scenario, we would get runtime state from a runtime service.
    // For now, we simulate based on provider enabled status.
    return providers.map(provider => ({
      id: provider.id,
      name: provider.name,
      type: provider.vendor || "Provider",
      initialized: true, // Placeholder
      loaded: true,      // Placeholder
      active: provider.enabled ?? true,
      state: (provider.enabled ?? true) ? "ACTIVE" : "INACTIVE",
    }));
  }

  public search(text: string): readonly RuntimeMonitorItem[] {
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

export const runtimeMonitorAdapter = new RuntimeMonitorAdapter();
