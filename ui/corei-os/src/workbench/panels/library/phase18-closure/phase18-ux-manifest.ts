/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * Stage       : 25
 * Phase       : 18
 * Step        : 16
 * Component   : Phase-18 UX Closure
 * File        : phase18-ux-manifest.ts
 *
 * PURPOSE
 * Authoritative manifest of all Phase‑18 UX panels.
 * This document is used for final validation and handoff.
 * =============================================================================
 */

export interface Phase18UxPanelManifest {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly singleton: boolean;
  readonly closable: boolean;
  readonly persistence: boolean;
  readonly minimumWidth: number;
  readonly minimumHeight: number;
  readonly permissions: readonly string[];
  readonly workspaceVisibility: readonly string[];
  readonly icon: string;
}

export const PHASE18_UX_PANELS: readonly Phase18UxPanelManifest[] = [
  {
    id: "capabilities",
    title: "Capability Explorer",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 340,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "capability"
  },
  {
    id: "providers",
    title: "Provider Explorer",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 340,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "provider"
  },
  {
    id: "capability-provider-relationships",
    title: "Capability Relationships",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "relationship"
  },
  {
    id: "provider-binding-inspector",
    title: "Provider Binding Inspector",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "binding"
  },
  {
    id: "resolution-monitor",
    title: "Resolution Monitor",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "radar"
  },
  {
    id: "lifecycle-monitor",
    title: "Lifecycle Monitor",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "lifecycle"
  },
  {
    id: "runtime-monitor",
    title: "Runtime Monitor",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "runtime"
  },
  {
    id: "health-availability",
    title: "Health & Availability Centre",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "health"
  },
  {
    id: "diagnostics",
    title: "Diagnostics Centre",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "diagnostics"
  },
  {
    id: "consumption-viewer",
    title: "Consumption Viewer",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "consumption"
  },
  {
    id: "provider-timeline",
    title: "Provider Event Timeline",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "timeline"
  },
  {
    id: "provider-control",
    title: "Provider Control Surface",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 360,
    minimumHeight: 320,
    permissions: ["workspace.read", "workspace.write"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "control"
  },
  {
    id: "search-context",
    title: "Search & Context",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 400,
    minimumHeight: 320,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "search"
  },
  {
    id: "integrated-institutional-view",
    title: "Integrated Institutional View",
    category: "system",
    singleton: true,
    closable: true,
    persistence: true,
    minimumWidth: 500,
    minimumHeight: 400,
    permissions: ["workspace.read"],
    workspaceVisibility: ["trading", "infrastructure"],
    icon: "dashboard"
  }
] as const;

export const PHASE18_UX_FILE_COUNT = PHASE18_UX_PANELS.length; // 14 panels
