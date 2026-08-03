import type { DomainContract }
from "../contracts/domain.contract";

export const domainRegistry:
DomainContract[] = [

  {
    domain_id: "d01-cluster",
    code: "D01",
    title: "Cluster",
    description: "Cluster Intelligence",
    icon: "cluster",
    order: 1
  },

  {
    domain_id: "d02-compute",
    code: "D02",
    title: "Compute",
    description: "Compute Intelligence",
    icon: "compute",
    order: 2
  },

  {
    domain_id: "d03-network",
    code: "D03",
    title: "Network",
    description: "Network Intelligence",
    icon: "network",
    order: 3
  },

  {
    domain_id: "d04-storage",
    code: "D04",
    title: "Storage",
    description: "Storage Intelligence",
    icon: "storage",
    order: 4
  },

  {
    domain_id: "d05-database",
    code: "D05",
    title: "Database",
    description: "Database Intelligence",
    icon: "database",
    order: 5
  },

  {
    domain_id: "d06-messaging",
    code: "D06",
    title: "Messaging",
    description: "Messaging Intelligence",
    icon: "messaging",
    order: 6
  },

  {
    domain_id: "d07-security",
    code: "D07",
    title: "Security",
    description: "Security Intelligence",
    icon: "security",
    order: 7
  },

  {
    domain_id: "d08-observability",
    code: "D08",
    title: "Observability",
    description: "Observability Intelligence",
    icon: "observability",
    order: 8
  },

  {
    domain_id: "d09-delivery",
    code: "D09",
    title: "Delivery",
    description: "Delivery Intelligence",
    icon: "delivery",
    order: 9
  },

  {
    domain_id: "d10-audit",
    code: "D10",
    title: "Audit",
    description: "Audit Intelligence",
    icon: "audit",
    order: 10
  },

  {
    domain_id: "d11-platform",
    code: "D11",
    title: "Platform",
    description: "Platform Intelligence",
    icon: "platform",
    order: 11
  }

];
