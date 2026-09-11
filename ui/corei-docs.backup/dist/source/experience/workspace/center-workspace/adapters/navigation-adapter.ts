export class NavigationAdapter {
  static mapToWorkspace(domain: string) {
    return {
      TRADING: 'TRADING_WS',
      INFRASTRUCTURE: 'INFRA_WS',
      RISK: 'RISK_WS',
      RESEARCH: 'RESEARCH_WS',
      EXECUTIVE: 'EXEC_WS'
    }[domain] || null;
  }
}
