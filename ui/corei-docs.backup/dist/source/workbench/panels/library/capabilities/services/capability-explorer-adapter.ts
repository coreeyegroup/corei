/**
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * File        : capability-explorer-adapter.ts
 * Purpose     : Adapter to consume Capability Platform for the Capability Explorer
 */
import { CapabilityManager } from "@/capabilities";
import type { CapabilityModel } from "@/capabilities";

export interface CapabilityExplorerItem {
  id: string;
  name: string;
  version: string;
  category: string;           // computed
  status: "active" | "inactive" | "unknown";
  availability: "available" | "unavailable" | "partial";
  description: string;        // fallback
  owner: string;              // fallback
  dependencies: string[];     // fallback
  runtimeSummary: string;     // fallback
}

export class CapabilityExplorerAdapter {
  private readonly manager: CapabilityManager;

  constructor() {
    this.manager = new CapabilityManager();
  }

  public getAllCapabilities(): CapabilityExplorerItem[] {
    const all = this.manager.getAll();
    return all.map((cap: CapabilityModel) => ({
      id: cap.id,
      name: cap.name,
      version: cap.version,
      category: "General",
      status: "active",
      availability: "available",
      description: "No description available",
      owner: "Platform",
      dependencies: [],
      runtimeSummary: "Operational",
    }));
  }
}

export const capabilityExplorerAdapter = new CapabilityExplorerAdapter();
