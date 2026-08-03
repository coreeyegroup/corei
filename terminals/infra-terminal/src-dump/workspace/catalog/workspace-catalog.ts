import type {
  WorkspaceTemplateContract
}
from "../contracts/workspace-template.contract";

export const workspaceCatalog:
WorkspaceTemplateContract[] = [

  {
    template_id: "cluster-overview",
    title: "Overview",
    view_id: "cluster-overview",
    icon: "◉"
  },

  {
    template_id: "cluster-nodes",
    title: "Nodes",
    view_id: "cluster-nodes",
    icon: "◈"
  },

  {
    template_id: "cluster-workloads",
    title: "Workloads",
    view_id: "cluster-workloads",
    icon: "◎"
  },

  {
    template_id: "cluster-events",
    title: "Events",
    view_id: "cluster-events",
    icon: "▲"
  },

  {
    template_id: "cluster-topology",
    title: "Topology",
    view_id: "cluster-topology",
    icon: "◆"
  },

  {
    template_id: "terminal",
    title: "Terminal",
    view_id: "terminal",
    icon: "⌘"
  },

  {
    template_id: "logs",
    title: "Logs",
    view_id: "logs",
    icon: "☰"
  },

  {
    template_id: "metrics",
    title: "Metrics",
    view_id: "metrics",
    icon: "◍"
  },

  {
    template_id: "alerts",
    title: "Alerts",
    view_id: "alerts",
    icon: "⚠"
  },

  {
    template_id: "audit",
    title: "Audit",
    view_id: "audit",
    icon: "✓"
  }

];
