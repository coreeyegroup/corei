/**
 * COREI – Intelligence Service
 * Stage-25 / Phase-22 / Step-07
 * Generates insights and recommendations from workspace context.
 */
import { WorkspaceContext } from '../../context/IntelligenceContext';
import { Insight, Recommendation } from '../../state/IntelligenceState';

export class IntelligenceService {
  generateInsights(context: WorkspaceContext | null): Insight[] {
    if (!context) return [];
    const insights: Insight[] = [];
    // Sample insights based on workspace type
    if (context.workspaceType === 'trading') {
      insights.push({
        id: 'insight-market-volatility',
        type: 'market',
        severity: 'info',
        message: 'Market volatility is increasing in the last hour.',
        timestamp: Date.now(),
        metadata: { source: 'volatility-index' },
      });
    } else if (context.workspaceType === 'research') {
      insights.push({
        id: 'insight-research-paper',
        type: 'research',
        severity: 'info',
        message: 'New research paper on AI trading strategies published.',
        timestamp: Date.now(),
        metadata: { source: 'arxiv' },
      });
    }
    // Generic insight
    insights.push({
      id: 'insight-workspace-active',
      type: 'system',
      severity: 'info',
      message: `Workspace "${context.workspaceName}" is active with ${context.activePanels.length} panels.`,
      timestamp: Date.now(),
    });
    return insights;
  }

  generateRecommendations(context: WorkspaceContext | null): Recommendation[] {
    if (!context) return [];
    const recommendations: Recommendation[] = [];
    if (context.workspaceType === 'trading' && !context.activePanels.includes('order-entry')) {
      recommendations.push({
        id: 'rec-open-order-entry',
        type: 'panel',
        title: 'Open Order Entry',
        description: 'To execute trades, open the Order Entry panel.',
        action: 'openPanel:order-entry',
        priority: 1,
        timestamp: Date.now(),
      });
    }
    if (context.workspaceType === 'research' && !context.activePanels.includes('knowledge-graph')) {
      recommendations.push({
        id: 'rec-open-knowledge-graph',
        type: 'panel',
        title: 'Open Knowledge Graph',
        description: 'Visualize research relationships.',
        action: 'openPanel:knowledge-graph',
        priority: 2,
        timestamp: Date.now(),
      });
    }
    return recommendations;
  }

  getDiagnostics() {
    return { service: 'IntelligenceService', status: 'operational' };
  }
}
