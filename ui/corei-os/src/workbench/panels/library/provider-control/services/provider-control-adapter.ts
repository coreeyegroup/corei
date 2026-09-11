/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 13
 * Component   : Provider Control Surface
 * File        : provider-control-adapter.ts
 * =============================================================================
 */

import { ProviderManager, type ProviderModel } from "@/providers";

export interface ProviderControlItem {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly enabled: boolean;
  readonly initialized: boolean;
  readonly loaded: boolean;
  readonly canInitialize: boolean;
  readonly canActivate: boolean;
  readonly canDeactivate: boolean;
  readonly canRefresh: boolean;
  readonly canReconnect: boolean;
}

export class ProviderControlAdapter {
  private readonly providerManager = new ProviderManager();

  public load(): readonly ProviderControlItem[] {
    const providers = this.providerManager.getAll();
    return providers.map(provider => ({
      id: provider.id,
      name: provider.name,
      type: provider.vendor || "Provider",
      enabled: provider.enabled ?? true,
      initialized: true, // placeholder – would come from runtime
      loaded: true,      // placeholder – would come from runtime
      canInitialize: !provider.enabled,
      canActivate: provider.enabled,
      canDeactivate: provider.enabled,
      canRefresh: true,
      canReconnect: true,
    }));
  }

  public search(text: string): readonly ProviderControlItem[] {
    const keyword = text.trim().toLowerCase();
    if (!keyword.length) return this.load();
    return this.load().filter(
      item =>
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword)
    );
  }

  // Control actions – these are stubs for now, they would call backend APIs in production.
  public initializeProvider(id: string): void {
    console.log(`[ProviderControl] Initializing provider: ${id}`);
    // In production: call backend initialization
  }

  public activateProvider(id: string): void {
    console.log(`[ProviderControl] Activating provider: ${id}`);
    // In production: call backend activation
  }

  public deactivateProvider(id: string): void {
    console.log(`[ProviderControl] Deactivating provider: ${id}`);
    // In production: call backend deactivation
  }

  public refreshProvider(id: string): void {
    console.log(`[ProviderControl] Refreshing provider: ${id}`);
    // In production: call backend refresh
  }

  public reconnectProvider(id: string): void {
    console.log(`[ProviderControl] Reconnecting provider: ${id}`);
    // In production: call backend reconnect
  }
}

export const providerControlAdapter = new ProviderControlAdapter();
