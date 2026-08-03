import {
  openWindow
}
from "../../../../shared/workspace-engine/services/window-service";

openWindow(
  "overview",
  "overview.workspace",
  "cluster-overview"
);

openWindow(
  "nodes",
  "nodes.workspace",
  "cluster-nodes"
);

openWindow(
  "workloads",
  "workloads.workspace",
  "cluster-workloads"
);

openWindow(
  "events",
  "events.workspace",
  "cluster-events"
);

openWindow(
  "topology",
  "topology.workspace",
  "cluster-topology"
);
