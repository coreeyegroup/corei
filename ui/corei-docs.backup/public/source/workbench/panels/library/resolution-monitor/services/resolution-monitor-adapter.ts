/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 * Component   : Resolution Monitor
 * File        : resolution-monitor-adapter.ts
 * =============================================================================
 */

import { CapabilityProviderResolver } from "@/capabilities/integration";
import { CapabilityProviderBindingRegistry } from "@/capabilities/integration";
import { CapabilityManager } from "@/capabilities";
import { ProviderManager } from "@/providers";

export interface ResolutionMonitorItem {
  readonly capabilityId: string;
  readonly capabilityName: string;
  readonly resolvedProviderId: string | null;
  readonly resolvedProviderName: string | null;
  readonly status: "resolved" | "unresolved" | "no_binding";
  readonly priority: number | null;
  readonly bindingEnabled: boolean | null;
}

export class ResolutionMonitorAdapter {
  private readonly bindingRegistry = new CapabilityProviderBindingRegistry();
  private readonly resolver = new CapabilityProviderResolver(this.bindingRegistry);
  private readonly capabilityManager = new CapabilityManager();
  private readonly providerManager = new ProviderManager();

  public load(): readonly ResolutionMonitorItem[] {
    const capabilities = this.capabilityManager.getAll();
    const providers = this.providerManager.getAll();

    return capabilities.map(cap => {
      const resolution = this.resolver.resolve(cap.id);
      const resolved = resolution.status === "resolved";
      const binding = resolved ? resolution.binding : null;

      const provider = resolved
        ? providers.find(p => p.id === resolution.providerId)
        : null;

      return {
        capabilityId: cap.id,
        capabilityName: cap.name,
        resolvedProviderId: resolved ? resolution.providerId : null,
        resolvedProviderName: provider?.name ?? null,
        status: resolved ? "resolved" : (binding ? "unresolved" : "no_binding"),
        priority: binding?.priority ?? null,
        bindingEnabled: binding?.enabled ?? null,
      };
    });
  }

  public search(text: string): readonly ResolutionMonitorItem[] {
    const keyword = text.trim().toLowerCase();
    if (!keyword.length) return this.load();
    return this.load().filter(
      item =>
        item.capabilityId.toLowerCase().includes(keyword) ||
        item.capabilityName.toLowerCase().includes(keyword) ||
        (item.resolvedProviderName && item.resolvedProviderName.toLowerCase().includes(keyword))
    );
  }
}

export const resolutionMonitorAdapter = new ResolutionMonitorAdapter();
