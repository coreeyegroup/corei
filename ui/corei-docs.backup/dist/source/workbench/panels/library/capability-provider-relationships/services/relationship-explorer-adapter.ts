/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * Component   : Capability ↔ Provider Relationship Explorer
 * File        : relationship-explorer-adapter.ts
 * =============================================================================
 */

import { CapabilityManager } from "@/capabilities";
import { ProviderManager } from "@/providers";
import { CapabilityProviderBindingRegistry } from "@/capabilities/integration";

export interface RelationshipItem {
  capabilityId: string;
  capabilityName: string;
  providerId: string;
  providerName: string;
  enabled: boolean;
  priority: number;
  status: "bound" | "unbound" | "resolved";
}

export class RelationshipExplorerAdapter {
  private readonly capabilityManager = new CapabilityManager();
  private readonly providerManager = new ProviderManager();
  private readonly bindingRegistry = new CapabilityProviderBindingRegistry();

  public load(): RelationshipItem[] {
    const capabilities = this.capabilityManager.getAll();
    const providers = this.providerManager.getAll();
    const bindings = this.bindingRegistry.getAll();

    // If no bindings, return a "not bound" for each capability
    if (bindings.length === 0) {
      return capabilities.map(cap => ({
        capabilityId: cap.id,
        capabilityName: cap.name,
        providerId: "",
        providerName: "Not bound",
        enabled: false,
        priority: 0,
        status: "unbound",
      }));
    }

    return bindings.map(binding => {
      const capability = capabilities.find(c => c.id === binding.capabilityId);
      const provider = providers.find(p => p.id === binding.providerId);
      return {
        capabilityId: binding.capabilityId,
        capabilityName: capability?.name ?? binding.capabilityId,
        providerId: binding.providerId,
        providerName: provider?.name ?? binding.providerId,
        enabled: binding.enabled,
        priority: binding.priority,
        status: binding.enabled ? "bound" : "unbound",
      };
    });
  }

  public search(text: string): RelationshipItem[] {
    const keyword = text.trim().toLowerCase();
    if (!keyword.length) return this.load();
    return this.load().filter(
      item =>
        item.capabilityName.toLowerCase().includes(keyword) ||
        item.providerName.toLowerCase().includes(keyword) ||
        item.capabilityId.toLowerCase().includes(keyword) ||
        item.providerId.toLowerCase().includes(keyword)
    );
  }
}

export const relationshipExplorerAdapter = new RelationshipExplorerAdapter();
