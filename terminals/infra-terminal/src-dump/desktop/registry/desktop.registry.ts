import type {
  DesktopWindowContract
}
from "../contracts/desktop-window.contract";

export const clusterDesktopWindows:
DesktopWindowContract[] = [

  {
    window_id: "cluster-health",
    template_id: "cluster-overview",
    title: "Cluster Health",
    description: "Cluster Status",
    view_id: "cluster-overview",
    icon: "◉",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "nodes",
    template_id: "cluster-nodes",
    title: "Nodes",
    description: "Node Inventory",
    view_id: "cluster-nodes",
    icon: "◈",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "workloads",
    template_id: "cluster-workloads",
    title: "Workloads",
    description: "Workload Runtime",
    view_id: "cluster-workloads",
    icon: "◎",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "events",
    template_id: "cluster-events",
    title: "Events",
    description: "Cluster Events",
    view_id: "cluster-events",
    icon: "▲",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "topology",
    template_id: "cluster-topology",
    title: "Topology",
    description: "Cluster Topology",
    view_id: "cluster-topology",
    icon: "◆",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "capacity",
    template_id: "capacity",
    title: "Capacity",
    description: "Capacity Planning",
    view_id: "capacity",
    icon: "▣",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "alerts",
    template_id: "alerts",
    title: "Alerts",
    description: "Operational Alerts",
    view_id: "alerts",
    icon: "⚠",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "resources",
    template_id: "resources",
    title: "Resources",
    description: "Infrastructure Resources",
    view_id: "resources",
    icon: "◍",
    default_width: 480,
    default_height: 320
  },

  {
    window_id: "governance",
    template_id: "governance",
    title: "Governance",
    description: "Policy Governance",
    view_id: "governance",
    icon: "✓",
    default_width: 480,
    default_height: 320
  }

];