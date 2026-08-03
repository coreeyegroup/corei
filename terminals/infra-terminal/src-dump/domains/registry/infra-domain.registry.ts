import type { InfraDomainContract }
from "../contracts/infra-domain.contract";

export const infraDomainRegistry:
InfraDomainContract[] = [

  {
    domain_id: "d01",
    code: "D01",
    name: "Cluster Intelligence",
    description: "Kubernetes Cluster Operations",
    route: "/cluster",
    icon: "cluster",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d02",
    code: "D02",
    name: "Compute Intelligence",
    description: "Compute Resources",
    route: "/compute",
    icon: "compute",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d03",
    code: "D03",
    name: "Network Intelligence",
    description: "Network Operations",
    route: "/network",
    icon: "network",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d04",
    code: "D04",
    name: "Storage Intelligence",
    description: "Storage Operations",
    route: "/storage",
    icon: "storage",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d05",
    code: "D05",
    name: "Database Intelligence",
    description: "Database Operations",
    route: "/database",
    icon: "database",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d06",
    code: "D06",
    name: "Messaging Intelligence",
    description: "Kafka Operations",
    route: "/messaging",
    icon: "messaging",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d07",
    code: "D07",
    name: "Security Intelligence",
    description: "Security Operations",
    route: "/security",
    icon: "security",
    classification: "restricted",
    permissions: ["view"]
  },

  {
    domain_id: "d08",
    code: "D08",
    name: "Observability Intelligence",
    description: "Monitoring Operations",
    route: "/observability",
    icon: "observability",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d09",
    code: "D09",
    name: "Delivery Intelligence",
    description: "Delivery Operations",
    route: "/delivery",
    icon: "delivery",
    classification: "confidential",
    permissions: ["view"]
  },

  {
    domain_id: "d10",
    code: "D10",
    name: "Audit Intelligence",
    description: "Audit Operations",
    route: "/audit",
    icon: "audit",
    classification: "restricted",
    permissions: ["view"]
  },

  {
    domain_id: "d11",
    code: "D11",
    name: "Platform Intelligence",
    description: "Platform Governance",
    route: "/platform",
    icon: "platform",
    classification: "restricted",
    permissions: ["view"]
  }

];
