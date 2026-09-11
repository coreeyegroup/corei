/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 10
 * Component   : Diagnostics Centre
 * File        : diagnostics-adapter.ts
 * =============================================================================
 */

import { ProviderManager, type ProviderModel } from "@/providers";
import { CapabilityManager } from "@/capabilities";
import { CapabilityProviderBindingRegistry } from "@/capabilities/integration";
import { HealthStatus } from "@/foundation/health/state/health-status";

export interface DiagnosticItem {
  readonly id: string;
  readonly name: string;
  readonly type: "capability" | "provider" | "binding" | "health" | "runtime";
  readonly status: "PASS" | "WARN" | "FAIL" | "UNKNOWN";
  readonly message: string;
  readonly details?: string;
}

export class DiagnosticsAdapter {
  private readonly providerManager = new ProviderManager();
  private readonly capabilityManager = new CapabilityManager();
  private readonly bindingRegistry = new CapabilityProviderBindingRegistry();

  public load(): readonly DiagnosticItem[] {
    const diagnostics: DiagnosticItem[] = [];

    // 1. Capability validation
    const capabilities = this.capabilityManager.getAll();
    if (capabilities.length === 0) {
      diagnostics.push({
        id: "capability-registry",
        name: "Capability Registry",
        type: "capability",
        status: "WARN",
        message: "No capabilities registered",
        details: "The capability registry is empty.",
      });
    } else {
      diagnostics.push({
        id: "capability-registry",
        name: "Capability Registry",
        type: "capability",
        status: "PASS",
        message: `${capabilities.length} capabilities registered`,
        details: `Registered capabilities: ${capabilities.map(c => c.name).join(", ")}`,
      });
    }

    // 2. Provider validation
    const providers = this.providerManager.getAll();
    if (providers.length === 0) {
      diagnostics.push({
        id: "provider-registry",
        name: "Provider Registry",
        type: "provider",
        status: "WARN",
        message: "No providers registered",
        details: "The provider registry is empty.",
      });
    } else {
      const enabled = providers.filter(p => p.enabled).length;
      const disabled = providers.length - enabled;
      diagnostics.push({
        id: "provider-registry",
        name: "Provider Registry",
        type: "provider",
        status: "PASS",
        message: `${providers.length} providers registered (${enabled} enabled, ${disabled} disabled)`,
        details: `Providers: ${providers.map(p => p.name).join(", ")}`,
      });
    }

    // 3. Binding validation
    const bindings = this.bindingRegistry.getAll();
    if (bindings.length === 0) {
      diagnostics.push({
        id: "binding-registry",
        name: "Binding Registry",
        type: "binding",
        status: "WARN",
        message: "No bindings registered",
        details: "No capability-provider bindings are registered.",
      });
    } else {
      const enabled = bindings.filter(b => b.enabled).length;
      const disabled = bindings.length - enabled;
      diagnostics.push({
        id: "binding-registry",
        name: "Binding Registry",
        type: "binding",
        status: "PASS",
        message: `${bindings.length} bindings registered (${enabled} enabled, ${disabled} disabled)`,
        details: `Bindings: ${bindings.map(b => `${b.capabilityId} → ${b.providerId}`).join(", ")}`,
      });
    }

    // 4. Health validation (simplified)
    const healthyProviders = providers.filter(p => p.enabled).length;
    const unhealthyProviders = providers.length - healthyProviders;
    diagnostics.push({
      id: "provider-health",
      name: "Provider Health",
      type: "health",
      status: unhealthyProviders === 0 ? "PASS" : unhealthyProviders > 0 ? "WARN" : "PASS",
      message: `${healthyProviders} healthy providers, ${unhealthyProviders} providers with issues`,
      details: unhealthyProviders > 0 ? "Some providers are disabled or unhealthy." : "All providers are healthy.",
    });

    // 5. Runtime validation
    const hasRuntime = providers.some(p => p.enabled);
    diagnostics.push({
      id: "runtime-status",
      name: "Runtime Status",
      type: "runtime",
      status: hasRuntime ? "PASS" : "WARN",
      message: hasRuntime ? "Runtime operational" : "No runtime providers available",
      details: hasRuntime ? "Runtime is ready for operations." : "Runtime cannot start without enabled providers.",
    });

    return diagnostics;
  }

  public search(text: string): readonly DiagnosticItem[] {
    const keyword = text.trim().toLowerCase();
    if (!keyword.length) return this.load();
    return this.load().filter(
      item =>
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.message.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword) ||
        (item.details && item.details.toLowerCase().includes(keyword))
    );
  }
}

export const diagnosticsAdapter = new DiagnosticsAdapter();
