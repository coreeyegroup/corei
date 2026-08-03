import type {
  DesktopWindowContract
}
from "../contracts/desktop-window.contract";

export const clusterDesktopWindows:
DesktopWindowContract[] = [

{
  template_id: "cluster-health",
  window_id: "cluster-health",
  title: "Cluster Health",
  description: "Cluster Status",
  view_id: "cluster-overview",

  icon: "◉",

  default_width: 480,
  default_height: 320
},

{
  template_id: "nodes",
  window_id: "nodes",
  title: "Nodes",
  description: "Node Inventory",
  view_id: "cluster-nodes",

  icon: "◈",

  default_width: 480,
  default_height: 320
},

{
  template_id: "workloads",
  window_id: "workloads",
  title: "Workloads",
  description: "Workload Runtime",
  view_id: "cluster-workloads",

  icon: "◎",

  default_width: 480,
  default_height: 320
},

{
  template_id: "events",
  window_id: "events",
  title: "Events",
  description: "Cluster Events",
  view_id: "cluster-events",

  icon: "▲",

  default_width: 480,
  default_height: 320
},

{
  template_id: "topology",
  window_id: "topology",
  title: "Topology",
  description: "Cluster Topology",
  view_id: "cluster-topology",

  icon: "◆",

   default_width: 480,
  default_height: 320
},

{
  template_id: "capacity",
  window_id: "capacity",
  title: "Capacity",
  description: "Capacity Planning",
  view_id: "capacity",

  icon: "▣",

  default_width: 480,
  default_height: 320
},

{
  template_id: "alerts",
  window_id: "alerts",
  title: "Alerts",
  description: "Operational Alerts",
  view_id: "alerts",

  icon: "⚠",

  default_width: 480,
  default_height: 320
},

{
  template_id: "resources",
  window_id: "resources",
  title: "Resources",
  description: "Infrastructure Resources",
  view_id: "resources",

  icon: "◍",

  default_width: 480,
  default_height: 320
},

{
  template_id: "governance",
  window_id: "governance",
  title: "Governance",
  description: "Policy Governance",
  view_id: "governance",

  icon: "✓",

  default_width: 480,
  default_height: 320
}

];