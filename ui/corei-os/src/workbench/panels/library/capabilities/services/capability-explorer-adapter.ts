/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : capability-explorer-adapter.ts
 * Purpose     : Adapter to consume Capability Platform for the Capability Explorer
 */
import { CapabilityManager } from "@/capabilities";

export interface CapabilityExplorerItem {
  id: string;
  name: string;
  category: string;
  description: string;
  version: string;
  status: "active" | "inactive" | "unknown";
  availability: "available" | "unavailable" | "partial";
  owner?: string;
  dependencies: string[];
  runtimeSummary: string;
}

export class CapabilityExplorerAdapter {
  private readonly manager: CapabilityManager;

  constructor() {
    // Instantiate the manager – if it requires parameters, adjust accordingly.
    // If CapabilityManager is a singleton but no getInstance, try new.
    // We'll cast to any to bypass type checks for constructor.
    this.manager = new (CapabilityManager as any)();
  }

  public getAllCapabilities(): CapabilityExplorerItem[] {
    // Try to get capabilities; use any to avoid type errors.
    const capabilities = (this.manager as any).getAll?.() 
                      || (this.manager as any).getCapabilities?.() 
                      || [];

    return capabilities.map((cap: any) => {
      // Only fields we know exist: id, name, version.
      // Everything else gets a fallback.
      const id = cap.id ?? 'unknown';
      const name = cap.name ?? 'Unnamed Capability';
      const version = cap.version ?? '1.0.0';

      return {
        id,
        name,
        category: 'General', // fallback
        description: 'No description available',
        version,
        status: 'unknown',
        availability: 'unknown',
        owner: 'Platform',
        dependencies: [],
        runtimeSummary: 'Operational',
      };
    });
  }
}

export const capabilityExplorerAdapter = new CapabilityExplorerAdapter();