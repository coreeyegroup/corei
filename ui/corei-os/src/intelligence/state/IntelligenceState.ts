/**
 * COREI – Intelligence State
 * Stage-25 / Phase-22
 */
import { StatePlatform } from '../types';

export interface Insight {
  id: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: number;
  metadata?: any;
}

export interface Recommendation {
  id: string;
  type: string;
  title: string;
  description: string;
  action?: string;
  priority: number;
  timestamp: number;
}

export class IntelligenceState {
  private statePlatform: StatePlatform;
  private insights: Insight[] = [];
  private recommendations: Recommendation[] = [];
  private readonly INSIGHT_KEY = 'intelligence.insights';
  private readonly RECOMMENDATION_KEY = 'intelligence.recommendations';

  constructor(statePlatform: StatePlatform) {
    this.statePlatform = statePlatform;
  }

  initialize(): void {
    const savedInsights = this.statePlatform.getState(this.INSIGHT_KEY);
    if (savedInsights) this.insights = savedInsights;
    const savedRecommendations = this.statePlatform.getState(this.RECOMMENDATION_KEY);
    if (savedRecommendations) this.recommendations = savedRecommendations;
  }

  updateInsights(insights: Insight[]): void {
    this.insights = insights;
    this.statePlatform.setState(this.INSIGHT_KEY, insights);
  }

  updateRecommendations(recommendations: Recommendation[]): void {
    this.recommendations = recommendations;
    this.statePlatform.setState(this.RECOMMENDATION_KEY, recommendations);
  }

  getInsights(): Insight[] {
    return this.insights;
  }

  getRecommendations(): Recommendation[] {
    return this.recommendations;
  }

  clear(): void {
    this.insights = [];
    this.recommendations = [];
    this.statePlatform.setState(this.INSIGHT_KEY, []);
    this.statePlatform.setState(this.RECOMMENDATION_KEY, []);
  }

  getDiagnostics() {
    return {
      insightCount: this.insights.length,
      recommendationCount: this.recommendations.length,
    };
  }
}
