export interface BrokerProvider {
    broker_id: string;
    display_name: string;
    adapter_name: string;
    enabled: boolean;
    metadata?: Record<string, unknown>;
}

export interface BrokerAccount {
    account_id: string;
    broker: string;
    display_name: string;
    environment: string;
    enabled: boolean;
    connected: boolean;
    session_id: string | null;
    credential_id: string | null;
    metadata?: Record<string, unknown>;
}

const BROKER_API_BASE =
    import.meta.env.VITE_BROKER_API_BASE ??
    "/api/broker";

async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${BROKER_API_BASE}${path}`, {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Broker API ${response.status}: ${response.statusText}`
        );
    }

    return response.json() as Promise<T>;
}

export function getBrokerProviders(): Promise<BrokerProvider[]> {
    return request<BrokerProvider[]>("/providers");
}

export function getBrokerAccounts(): Promise<BrokerAccount[]> {
    return request<BrokerAccount[]>("/accounts");
}
