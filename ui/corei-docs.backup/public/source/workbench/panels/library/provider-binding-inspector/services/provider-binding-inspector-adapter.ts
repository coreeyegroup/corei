/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * Component   : Provider Binding Inspector
 * File        : provider-binding-inspector-adapter.ts
 * =============================================================================
 */

import { CapabilityProviderBindingRegistry } from "@/capabilities/integration";
import type { CapabilityProviderBinding } from "@/capabilities/integration";

export interface ProviderBindingInspectorItem {
  readonly capabilityId: string;
  readonly providerId: string;
  readonly priority: number;
  readonly enabled: boolean;
}

export class ProviderBindingInspectorAdapter {
  private readonly registry = new CapabilityProviderBindingRegistry();

  public load(): readonly ProviderBindingInspectorItem[] {
    return this.registry.getAll().map(this.toItem);
  }

  public search(text: string): readonly ProviderBindingInspectorItem[] {
    const keyword = text.trim().toLowerCase();
    if (!keyword.length) return this.load();
    return this.load().filter(
      item =>
        item.capabilityId.toLowerCase().includes(keyword) ||
        item.providerId.toLowerCase().includes(keyword)
    );
  }

  private readonly toItem = (binding: CapabilityProviderBinding): ProviderBindingInspectorItem => ({
    capabilityId: binding.capabilityId,
    providerId: binding.providerId,
    priority: binding.priority,
    enabled: binding.enabled,
  });
}

export const providerBindingInspectorAdapter = new ProviderBindingInspectorAdapter();
