/**
 * COREI – Mock Data Service
 * Stage-25 / Phase-26
 * Simulates real-time institutional data streams for visual polishing.
 * This is a demonstration service and can be replaced with actual WebSocket/SSE later.
 */
import { IntelligenceRuntime } from '../intelligence/right-panel/runtime/intelligence-runtime';
import { InfrastructureRuntime } from '../infrastructure-integration/runtime/InfrastructureRuntime';
import { Insight, Recommendation } from '../intelligence/state/IntelligenceState';
import { InfrastructureConnector, InfrastructureHealth } from '../infrastructure-integration/models/InfrastructureModels';

const ASSETS = ['BTC/USD', 'ETH/USD', 'AAPL', 'MSFT', 'GOOGL', 'EUR/USD', 'GBP/USD', 'NVDA', 'AMZN', 'META'];
const STATUSES = ['healthy', 'healthy', 'healthy', 'warning', 'critical'] as const;
const SEVERITIES = ['info', 'info', 'warning', 'critical'] as const;

export class MockDataService {
  private intelligenceRuntime: IntelligenceRuntime;
  private infrastructureRuntime: InfrastructureRuntime;
  private intervals: ReturnType<typeof setInterval>[] = [];

  constructor(
    intelligenceRuntime: IntelligenceRuntime,
    infrastructureRuntime: InfrastructureRuntime
  ) {
    this.intelligenceRuntime = intelligenceRuntime;
    this.infrastructureRuntime = infrastructureRuntime;
  }

  start(): void {
    // Update intelligence every 3 seconds
    this.intervals.push(setInterval(() => this.updateIntelligence(), 3000));
    // Update infrastructure every 4 seconds
    this.intervals.push(setInterval(() => this.updateInfrastructure(), 4000));
    // Initial update
    this.updateIntelligence();
    this.updateInfrastructure();
    console.log('[MockDataService] Real-time simulation started');
  }

  stop(): void {
    this.intervals.forEach(clearInterval);
    this.intervals = [];
    console.log('[MockDataService] Real-time simulation stopped');
  }

  private updateIntelligence(): void {
    const context = this.intelligenceRuntime.getContext();
    if (!context) return;

    const asset = ASSETS[Math.floor(Math.random() * ASSETS.length)];
    const change = (Math.random() * 4 - 2);
    const price = (100 + Math.random() * 900);
    const severity = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];

    const newInsight: Insight = {
      id: `ins-${Date.now()}`,
      type: 'market',
      severity: severity,
      message: `${asset} at $${price.toFixed(2)} (${change > 0 ? '+' : ''}${change.toFixed(2)}%)`,
      timestamp: Date.now(),
      metadata: { asset, change, price },
    };

    const recAction = Math.random() > 0.6 ? 'openPanel:order-entry' : 'executeCommand analyze';
    const newRecommendation: Recommendation = {
      id: `rec-${Date.now()}`,
      type: 'action',
      title: Math.abs(change) > 1.5 ? '⚠️ Volatility Alert' : 'Market Update',
      description: `${asset} is showing ${Math.abs(change) > 1.5 ? 'high' : 'moderate'} volatility.`,
      action: recAction,
      priority: Math.abs(change) > 1.5 ? 1 : 3,
      timestamp: Date.now(),
    };

    // Get existing data and prepend new ones
    const existingInsights = this.intelligenceRuntime.getInsights();
    const existingRecommendations = this.intelligenceRuntime.getRecommendations();

    const updatedInsights = [newInsight, ...existingInsights.slice(0, 4)];
    const updatedRecommendations = [newRecommendation, ...existingRecommendations.slice(0, 3)];

    this.intelligenceRuntime.simulateData(updatedInsights, updatedRecommendations);
  }

  private updateInfrastructure(): void {
    const connectors: InfrastructureConnector[] = [
      {
        id: 'conn-1',
        name: 'Market Data Feed',
        type: 'kafka',
        status: 'connected',
        endpoint: 'kafka://mdp.corei.local:9092',
        capabilities: ['publish', 'subscribe'],
        health: Math.random() > 0.92 ? 'degraded' : 'healthy',
        lastCheck: Date.now(),
      },
      {
        id: 'conn-2',
        name: 'Cache Layer',
        type: 'redis',
        status: 'connected',
        endpoint: 'redis://cache.corei.local:6379',
        capabilities: ['cache', 'pubsub'],
        health: Math.random() > 0.88 ? 'degraded' : 'healthy',
        lastCheck: Date.now(),
      },
      {
        id: 'conn-3',
        name: 'Execution Gateway',
        type: 'broker',
        status: Math.random() > 0.95 ? 'disconnected' : 'connected',
        endpoint: 'tcp://exec.corei.local:50051',
        capabilities: ['execute', 'quote'],
        health: Math.random() > 0.92 ? 'degraded' : 'healthy',
        lastCheck: Date.now(),
      },
      {
        id: 'conn-4',
        name: 'Log Aggregator',
        type: 'loki',
        status: 'connected',
        endpoint: 'loki://logs.corei.local:3100',
        capabilities: ['query', 'stream'],
        health: Math.random() > 0.95 ? 'critical' : 'healthy',
        lastCheck: Date.now(),
      },
    ];

    const overall = connectors.some(c => c.health === 'critical') ? 'critical'
      : connectors.some(c => c.health === 'degraded') ? 'degraded'
      : connectors.some(c => c.health === 'degraded') ? 'degraded'
      : 'healthy';

    const health: InfrastructureHealth = {
      overall,
      components: connectors.reduce((acc, c) => ({ ...acc, [c.name]: c.health }), {}),
      timestamp: Date.now(),
      details: { total: connectors.length, connected: connectors.filter(c => c.status === 'connected').length },
    };

    this.infrastructureRuntime.simulateData(connectors, health);
  }
}
