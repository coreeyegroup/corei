export type BrokerHealth =
    | "operational"
    | "degraded"
    | "offline"
    | "unknown";

export type BrokerEnvironment =
    | "LIVE"
    | "PAPER"
    | "SANDBOX"
    | "UNKNOWN";

export interface BrokerIntelligenceRecord {
    brokerId: string;
    name: string;
    adapter: string;
    enabled: boolean;
    health: BrokerHealth;
    environments: BrokerEnvironment[];
    accountCount: number;
    connectedAccounts: number;
    metadata: Record<string, unknown>;
}
