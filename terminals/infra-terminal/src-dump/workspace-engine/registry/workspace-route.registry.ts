import type { WorkspaceRouteContract }
from "../contracts/workspace-route.contract";

export const workspaceRouteRegistry:
WorkspaceRouteContract[] = [

  {
    route_id: "overview",
    view_id: "overview",
    component: "OverviewWorkspace",
    title: "Overview"
  },

  {
    route_id: "nodes",
    view_id: "nodes",
    component: "NodesWorkspace",
    title: "Nodes"
  },

  {
    route_id: "pods",
    view_id: "pods",
    component: "PodsWorkspace",
    title: "Pods"
  },

  {
    route_id: "events",
    view_id: "events",
    component: "EventsWorkspace",
    title: "Events"
  },

  {
    route_id: "topology",
    view_id: "topology",
    component: "TopologyWorkspace",
    title: "Topology"
  }

];
