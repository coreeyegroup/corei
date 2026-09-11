// src/services/brokerIntelligenceService.ts
import { useBrokerIntelligenceStore } from '../store/brokerIntelligenceStore';
import type { BrokerProvider, BrokerAccount, BrokerCredential } from '../types/brokerIntelligence';
import { toast } from 'sonner';

const API_BASE = '/api/broker'; // Uses Vite Proxy

const ENDPOINTS = {
  providers: `${API_BASE}/providers`,
  accounts: `${API_BASE}/accounts`,
  credentials: `${API_BASE}/credentials`,
  accountCredentials: (id: string) => `${API_BASE}/accounts/${id}/credentials`,
  connectAccount: (id: string) => `${API_BASE}/accounts/${id}/connect`,
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export const brokerIntelligenceService = {
  async addProvider(input: {
    id: string;
    name: string;
    adapterName: string;
    adapterVersion: string;
    type: string;
    region: string;
    environment: string;
    enabled?: boolean;
    metadata?: Record<string, unknown>;
  }) {
    return request<BrokerProvider>(`${ENDPOINTS.providers}`, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async registerAccount(input: {
    accountId: string;
    broker: string;
    displayName: string;
    environment: string;
    enabled?: boolean;
  }) {
    const params = new URLSearchParams({
      account_id: input.accountId,
      broker: input.broker,
      display_name: input.displayName,
      environment: input.environment,
      enabled: String(input.enabled ?? true),
    });

    return request<BrokerAccount>(
      `${ENDPOINTS.accounts}?${params.toString()}`,
      { method: "POST" }
    );
  },

  async setAccountCredentials(
    accountId: string,
    credentials: Record<string, unknown>
  ) {
    return request<unknown>(
      ENDPOINTS.accountCredentials(accountId),
      { method: "PUT", body: JSON.stringify(credentials) }
    );
  },

  async getAccountCredentials(accountId: string) {
    return request<unknown>(ENDPOINTS.accountCredentials(accountId));
  },

  async fetchAll() {
    const store = useBrokerIntelligenceStore.getState();
    store.setLoading(true);
    store.setError(null);

    try {
      const [providerPayload, accountPayload] = await Promise.all([
        request<BrokerProvider[] | { brokers?: unknown }>(ENDPOINTS.providers),
        request<BrokerAccount[] | Record<string, unknown>>(ENDPOINTS.accounts),
      ]);

      const rawProviders = Array.isArray(providerPayload)
        ? providerPayload
        : Array.isArray(providerPayload?.brokers)
          ? providerPayload.brokers
          : [];

      const rawAccounts = Array.isArray(accountPayload)
        ? accountPayload
        : [];

      const accounts: BrokerAccount[] = rawAccounts.map((account: any) => ({
        id: String(account.id ?? account.account_id ?? ''),
        brokerId: String(account.brokerId ?? account.broker_id ?? account.broker ?? ''),
        displayName: String(account.displayName ?? account.display_name ?? account.id ?? account.account_id ?? ''),
        environment: String(account.environment ?? 'TEST').toUpperCase() === 'LIVE' ? 'LIVE' : String(account.environment ?? 'TEST').toUpperCase() === 'PAPER' ? 'PAPER' : 'TEST',
        enabled: account.enabled !== false,
        connected: account.connected === true,
        sessionId: account.sessionId ?? account.session_id ?? null,
        credentialRef: account.credentialRef ?? account.credential_id ?? null,
        health: account.health ?? account.state ?? 'UNKNOWN',
        tradingEnabled: account.tradingEnabled ?? false,
        marketDataEnabled: account.marketDataEnabled ?? false,
      }));

      const providers: BrokerProvider[] = rawProviders.map((broker: any) => {
        const id = String(typeof broker === 'string' ? broker : broker.id ?? broker.brokerId ?? broker.broker_id ?? broker.name ?? '');
        const name = String(typeof broker === 'string' ? broker : broker.name ?? id);
        const brokerAccounts = accounts.filter((account) => account.brokerId === id);

        // Correctly extract environment from metadata if present
        const metaEnv = broker?.metadata?.environment || broker?.environment || 'TEST';

        return {
          id,
          name,
          // CORRECTLY maps `adapter_name` from backend
          adapterName: typeof broker === 'object'
            ? String(broker.adapterName ?? broker.adapter_name ?? broker.adapter ?? id)
            : id,
          adapterVersion: typeof broker === 'object' ? String(broker.adapterVersion ?? broker.metadata?.adapter_version ?? 'UNKNOWN') : 'UNKNOWN',
          type: (broker?.metadata?.type || 'BROKER') as 'BROKER' | 'FEEDER' | 'EXCHANGE',
          region: typeof broker === 'object' ? String(broker.region ?? broker.metadata?.region ?? 'UNKNOWN') : 'UNKNOWN',
          environment: brokerAccounts.some((a) => a.environment === 'LIVE') ? 'LIVE' : metaEnv.toUpperCase() === 'LIVE' ? 'LIVE' : metaEnv.toUpperCase() === 'PAPER' ? 'PAPER' : 'TEST',
          enabled: typeof broker === 'object' ? broker.enabled !== false : true,
          status: typeof broker === 'object' ? broker.status ?? 'UNKNOWN' : 'UNKNOWN',
          health: typeof broker === 'object' ? broker.health ?? 'UNKNOWN' : 'UNKNOWN',
          state: typeof broker === 'object' ? broker.state ?? 'UNKNOWN' : 'UNKNOWN',
          authState: typeof broker === 'object' ? broker.authState ?? 'UNKNOWN' : 'UNKNOWN',
          restState: typeof broker === 'object' ? broker.restState ?? 'UNKNOWN' : 'UNKNOWN',
          wsState: typeof broker === 'object' ? broker.wsState ?? 'UNKNOWN' : 'UNKNOWN',
          marketDataState: typeof broker === 'object' ? broker.marketDataState ?? 'UNKNOWN' : 'UNKNOWN',
          executionState: typeof broker === 'object' ? broker.executionState ?? 'UNKNOWN' : 'UNKNOWN',
          latency: typeof broker === 'object' ? String(broker.latency ?? 'UNKNOWN') : 'UNKNOWN',
          rateLimitState: typeof broker === 'object' ? String(broker.rateLimitState ?? 'UNKNOWN') : 'UNKNOWN',
          accountCount: typeof broker === 'object' && broker.accountCount != null ? Number(broker.accountCount) : brokerAccounts.length,
          credentialCount: typeof broker === 'object' && broker.credentialCount != null ? Number(broker.credentialCount) : 0,
        };
      });

      const credentials: BrokerCredential[] = [];

      store.setProviders(Array.isArray(providers) ? providers : []);
      store.setAccounts(Array.isArray(accounts) ? accounts : []);
      store.setCredentials(credentials);
      store.setLastRefresh(Date.now());
    } catch (error: any) {
      store.setError(error.message);
      toast.error(`Failed to fetch broker data: ${error.message}`);
    } finally {
      store.setLoading(false);
    }
  },

  async connectAccount(accountId: string) {
    const store = useBrokerIntelligenceStore.getState();
    try {
      await request(ENDPOINTS.connectAccount(accountId), { method: 'POST' });
      store.updateAccount(accountId, { connected: true, health: 'CONNECTED' });
      toast.success(`Account ${accountId} connected`);
    } catch (err: any) { toast.error(`Connect failed: ${err.message}`); }
  },
};
