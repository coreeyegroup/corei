import { useBrokerAccountStore } from '../store/brokerAccountStore';

class BrokerAccountService {
  // Simulate POST /brokers, POST /accounts, etc.
  async createAccount(account: any) {
    console.log('Calling PostgreSQL Broker Repository...');
    const store = useBrokerAccountStore.getState();
    store.setAccounts([...store.accounts, account]);
  }

  // Simulate POST /credentials/{ref}/rotate
  async rotateCredential(ref: string) {
    console.log(`Calling Credential Service to rotate ${ref} via Kubernetes/Vault...`);
    const store = useBrokerAccountStore.getState();
    const updatedCredentials = store.credentials.map(c =>
      c.ref === ref ? { ...c, status: 'ROTATING' as const } : c
    );
    store.setCredentials(updatedCredentials);
  }

  // Simulate POST /connections/test
  async testConnection(accountId: string) {
    console.log(`Testing connection for ${accountId}...`);
    const store = useBrokerAccountStore.getState();
    const updatedConnections = store.connections.map(conn =>
      conn.accountId === accountId ? { ...conn, status: 'PENDING' as const } : conn
    );
    store.setConnections(updatedConnections);
  }
}

export const brokerAccountService = new BrokerAccountService();
