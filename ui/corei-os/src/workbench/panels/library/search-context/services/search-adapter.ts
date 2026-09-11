/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 14
 * Component   : Search & Context
 * File        : search-adapter.ts
 * =============================================================================
 */

import { ProviderManager, type ProviderModel } from "@/providers";
import { CapabilityManager, type CapabilityModel } from "@/capabilities";
import { CapabilityProviderBindingRegistry } from "@/capabilities/integration";
import { diagnosticsAdapter } from "@/workbench/panels/library/diagnostics/services/diagnostics-adapter";

export interface SearchResult {
  readonly id: string;
  readonly type: "capability" | "provider" | "binding" | "diagnostic" | "event";
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly context: {
    capabilityId?: string;
    providerId?: string;
    status?: string;
  };
  readonly score: number;
}

export class SearchAdapter {
  private readonly providerManager = new ProviderManager();
  private readonly capabilityManager = new CapabilityManager();
  private readonly bindingRegistry = new CapabilityProviderBindingRegistry();

  public search(query: string): readonly SearchResult[] {
    const keyword = query.trim().toLowerCase();
    if (!keyword.length) return [];

    const results: SearchResult[] = [];

    // Search capabilities
    const capabilities = this.capabilityManager.getAll();
    for (const cap of capabilities) {
      const nameMatch = cap.name.toLowerCase().includes(keyword);
      const idMatch = cap.id.toLowerCase().includes(keyword);
      if (nameMatch || idMatch) {
        results.push({
          id: `cap-${cap.id}`,
          type: "capability",
          title: cap.name,
          subtitle: cap.id,
          description: `Capability ID: ${cap.id} | Version: ${cap.version}`,
          context: { capabilityId: cap.id },
          score: nameMatch ? 10 : 5,
        });
      }
    }

    // Search providers
    const providers = this.providerManager.getAll();
    for (const provider of providers) {
      const nameMatch = provider.name.toLowerCase().includes(keyword);
      const idMatch = provider.id.toLowerCase().includes(keyword);
      const vendorMatch = provider.vendor?.toLowerCase().includes(keyword) ?? false;
      if (nameMatch || idMatch || vendorMatch) {
        results.push({
          id: `prov-${provider.id}`,
          type: "provider",
          title: provider.name,
          subtitle: provider.vendor || "Provider",
          description: `ID: ${provider.id} | Enabled: ${provider.enabled ? "Yes" : "No"}`,
          context: { providerId: provider.id, status: provider.enabled ? "active" : "inactive" },
          score: nameMatch ? 10 : (idMatch ? 7 : 5),
        });
      }
    }

    // Search bindings
    const bindings = this.bindingRegistry.getAll();
    for (const binding of bindings) {
      const capMatch = binding.capabilityId.toLowerCase().includes(keyword);
      const provMatch = binding.providerId.toLowerCase().includes(keyword);
      if (capMatch || provMatch) {
        results.push({
          id: `bind-${binding.capabilityId}-${binding.providerId}`,
          type: "binding",
          title: `${binding.capabilityId} → ${binding.providerId}`,
          subtitle: `Priority: ${binding.priority}`,
          description: `Enabled: ${binding.enabled ? "Yes" : "No"}`,
          context: {
            capabilityId: binding.capabilityId,
            providerId: binding.providerId,
            status: binding.enabled ? "active" : "inactive",
          },
          score: capMatch ? 10 : 7,
        });
      }
    }

    // Search diagnostics
    const diagnostics = diagnosticsAdapter.load();
    for (const diag of diagnostics) {
      const nameMatch = diag.name.toLowerCase().includes(keyword);
      const msgMatch = diag.message.toLowerCase().includes(keyword);
      if (nameMatch || msgMatch) {
        results.push({
          id: `diag-${diag.id}`,
          type: "diagnostic",
          title: diag.name,
          subtitle: diag.status,
          description: diag.message,
          context: { status: diag.status },
          score: nameMatch ? 10 : 5,
        });
      }
    }

    // Sort by score descending, then by title
    return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  }
}

export const searchAdapter = new SearchAdapter();
