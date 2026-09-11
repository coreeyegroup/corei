/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 12
 * Component   : Provider Event Timeline
 * File        : provider-timeline-adapter.ts
 * =============================================================================
 */

import { ProviderManager, type ProviderModel } from "@/providers";
import { CapabilityProviderBindingRegistry } from "@/capabilities/integration";

export interface TimelineEvent {
  readonly id: string;
  readonly timestamp: string;
  readonly providerId: string;
  readonly providerName: string;
  readonly eventType: "registered" | "activated" | "deactivated" | "failed" | "recovered" | "updated";
  readonly details?: string;
}

export class ProviderTimelineAdapter {
  private readonly providerManager = new ProviderManager();
  private readonly bindingRegistry = new CapabilityProviderBindingRegistry();

  public load(): readonly TimelineEvent[] {
    const providers = this.providerManager.getAll();
    const events: TimelineEvent[] = [];

    for (const provider of providers) {
      // Registration event
      events.push({
        id: `${provider.id}-registered`,
        timestamp: new Date().toISOString(),
        providerId: provider.id,
        providerName: provider.name,
        eventType: "registered",
        details: `Provider ${provider.name} registered`,
      });

      // Activation event if enabled
      if (provider.enabled) {
        events.push({
          id: `${provider.id}-activated`,
          timestamp: new Date().toISOString(),
          providerId: provider.id,
          providerName: provider.name,
          eventType: "activated",
          details: `Provider ${provider.name} activated`,
        });
      }

      // Deactivation event if disabled
      if (!provider.enabled) {
        events.push({
          id: `${provider.id}-deactivated`,
          timestamp: new Date().toISOString(),
          providerId: provider.id,
          providerName: provider.name,
          eventType: "deactivated",
          details: `Provider ${provider.name} deactivated`,
        });
      }

      // Add a dummy failure/recovery event for demonstration
      if (provider.id === "dockview") {
        events.push({
          id: `${provider.id}-failed-1`,
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          providerId: provider.id,
          providerName: provider.name,
          eventType: "failed",
          details: "Dockview failed to initialize, retrying...",
        });
        events.push({
          id: `${provider.id}-recovered-1`,
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          providerId: provider.id,
          providerName: provider.name,
          eventType: "recovered",
          details: "Dockview recovered successfully after retry",
        });
      }
    }

    // Sort by timestamp descending (newest first)
    return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public search(text: string): readonly TimelineEvent[] {
    const keyword = text.trim().toLowerCase();
    if (!keyword.length) return this.load();
    return this.load().filter(
      event =>
        event.providerId.toLowerCase().includes(keyword) ||
        event.providerName.toLowerCase().includes(keyword) ||
        event.eventType.toLowerCase().includes(keyword) ||
        (event.details && event.details.toLowerCase().includes(keyword))
    );
  }
}

export const providerTimelineAdapter = new ProviderTimelineAdapter();
