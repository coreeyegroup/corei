import type { ViewContract }
from "../contracts/view.contract";

export const viewRegistry:
ViewContract[] = [

  {
    view_id: "cluster-overview",
    domain_id: "d01-cluster",
    title: "Overview",
    route: "/cluster/overview",
    icon: "overview",
    order: 1
  },

  {
    view_id: "cluster-nodes",
    domain_id: "d01-cluster",
    title: "Nodes",
    route: "/cluster/nodes",
    icon: "nodes",
    order: 2
  },

  {
    view_id: "cluster-workloads",
    domain_id: "d01-cluster",
    title: "Workloads",
    route: "/cluster/workloads",
    icon: "workloads",
    order: 3
  },

  {
    view_id: "cluster-pods",
    domain_id: "d01-cluster",
    title: "Pods",
    route: "/cluster/pods",
    icon: "pods",
    order: 4
  },

  {
    view_id: "cluster-events",
    domain_id: "d01-cluster",
    title: "Events",
    route: "/cluster/events",
    icon: "events",
    order: 5
  },

  {
    view_id: "cluster-capacity",
    domain_id: "d01-cluster",
    title: "Capacity",
    route: "/cluster/capacity",
    icon: "capacity",
    order: 6
  },

  {
    view_id: "cluster-topology",
    domain_id: "d01-cluster",
    title: "Topology",
    route: "/cluster/topology",
    icon: "topology",
    order: 7
  },

  {
    view_id: "compute-overview",
    domain_id: "d02-compute",
    title: "Overview",
    route: "/compute/overview",
    icon: "overview",
    order: 1
  },

  {
    view_id: "compute-hosts",
    domain_id: "d02-compute",
    title: "Hosts",
    route: "/compute/hosts",
    icon: "hosts",
    order: 2
  },

  {
    view_id: "compute-containers",
    domain_id: "d02-compute",
    title: "Containers",
    route: "/compute/containers",
    icon: "containers",
    order: 3
  }

];
