import {
  ClusterDesktop
}
from "../../desktop/components/ClusterDesktop";


import {
  ClusterOverviewWorkspace
}
from "../../workspaces/ClusterOverviewWorkspace";


import {
  ClusterNodesWorkspace
}
from "../../workspaces/ClusterNodesWorkspace";


import {
  ClusterWorkloadsWorkspace
}
from "../../workspaces/ClusterWorkloadsWorkspace";


import {
  ClusterEventsWorkspace
}
from "../../workspaces/ClusterEventsWorkspace";


import {
  ClusterTopologyWorkspace
}
from "../../workspaces/ClusterTopologyWorkspace";


import {
  TerminalWorkspace
}
from "../../workspaces/TerminalWorkspace";


import {
  LogsWorkspace
}
from "../../workspaces/LogsWorkspace";


import {
  MetricsWorkspace
}
from "../../workspaces/MetricsWorkspace";


import {
  AlertsWorkspace
}
from "../../workspaces/AlertsWorkspace";


import {
  AuditWorkspace
}
from "../../workspaces/AuditWorkspace";



interface Props {

  viewId: string;

}



export function WorkspaceRenderer(
  {
    viewId
  }: Props
) {


  switch (
    viewId
  ) {


    case "d01-desktop":

      return (
        <ClusterDesktop />
      );


    case "cluster-overview":

      return (
        <ClusterOverviewWorkspace />
      );


    case "cluster-nodes":

      return (
        <ClusterNodesWorkspace />
      );


    case "cluster-workloads":

      return (
        <ClusterWorkloadsWorkspace />
      );


    case "cluster-events":

      return (
        <ClusterEventsWorkspace />
      );


    case "cluster-topology":

      return (
        <ClusterTopologyWorkspace />
      );


    case "terminal":

      return (
        <TerminalWorkspace />
      );


    case "logs":

      return (
        <LogsWorkspace />
      );


    case "metrics":

      return (
        <MetricsWorkspace />
      );


    case "alerts":

      return (
        <AlertsWorkspace />
      );


    case "audit":

      return (
        <AuditWorkspace />
      );


    default:

      return (
        <ClusterDesktop />
      );

  }

}
