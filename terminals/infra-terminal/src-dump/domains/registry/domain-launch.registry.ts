import type {
  DomainLaunchContract
}
from "../contracts/domain-launch.contract";


export const domainLaunchRegistry:
DomainLaunchContract[] = [

  {
    domain_id: "d01",
    title: "Cluster",
    desktop_id: "d01-desktop",
    route: "/?domain=d01",
    launch_mode: "embedded"
  },

  {
    domain_id: "d02",
    title: "Compute",
    desktop_id: "d02-desktop",
    route: "/?domain=d02",
    launch_mode: "embedded"
  },

  {
    domain_id: "d03",
    title: "Network",
    desktop_id: "d03-desktop",
    route: "/?domain=d03",
    launch_mode: "embedded"
  },

  {
    domain_id: "d04",
    title: "Storage",
    desktop_id: "d04-desktop",
    route: "/?domain=d04",
    launch_mode: "embedded"
  },

  {
    domain_id: "d05",
    title: "Database",
    desktop_id: "d05-desktop",
    route: "/?domain=d05",
    launch_mode: "embedded"
  },

  {
    domain_id: "d06",
    title: "Messaging",
    desktop_id: "d06-desktop",
    route: "/?domain=d06",
    launch_mode: "embedded"
  },

  {
    domain_id: "d07",
    title: "Security",
    desktop_id: "d07-desktop",
    route: "/?domain=d07",
    launch_mode: "embedded"
  },

  {
    domain_id: "d08",
    title: "Observability",
    desktop_id: "d08-desktop",
    route: "/?domain=d08",
    launch_mode: "embedded"
  },

  {
    domain_id: "d09",
    title: "Delivery",
    desktop_id: "d09-desktop",
    route: "/?domain=d09",
    launch_mode: "embedded"
  },

  {
    domain_id: "d10",
    title: "Audit",
    desktop_id: "d10-desktop",
    route: "/?domain=d10",
    launch_mode: "embedded"
  },

  {
    domain_id: "d11",
    title: "Platform",
    desktop_id: "d11-desktop",
    route: "/?domain=d11",
    launch_mode: "embedded"
  }

];
