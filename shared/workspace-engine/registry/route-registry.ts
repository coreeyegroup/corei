import type { RouteContract }
from "../contracts/route.contract";

export const routeRegistry:
RouteContract[] = [

  {
    route_id: "cluster-overview",
    view_id: "cluster-overview",
    component_id: "ClusterOverviewWorkspace",
    title: "Overview"
  },

  {
    route_id: "cluster-nodes",
    view_id: "cluster-nodes",
    component_id: "ClusterNodesWorkspace",
    title: "Nodes"
  },

  {
    route_id: "cluster-workloads",
    view_id: "cluster-workloads",
    component_id: "ClusterWorkloadsWorkspace",
    title: "Workloads"
  },

  {
    route_id: "cluster-events",
    view_id: "cluster-events",
    component_id: "ClusterEventsWorkspace",
    title: "Events"
  },

  {
    route_id: "cluster-topology",
    view_id: "cluster-topology",
    component_id: "ClusterTopologyWorkspace",
    title: "Topology"
  }

];
