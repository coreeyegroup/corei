/**
 * COREI – Intelligence Runtime
 * Stage-25 / Phase-22
 */
import { WorkspaceRuntime, PanelRuntime, EventPlatform, StatePlatform } from '../../types';
import { IntelligenceService } from '../services/intelligence-service';
import { IntelligenceContext } from '../../context/IntelligenceContext';
import { IntelligenceState } from '../../state/IntelligenceState';
import { IntelligenceEventHandlers } from '../../events/IntelligenceEventHandlers';
import { Insight, Recommendation } from '../../state/IntelligenceState';

export class IntelligenceRuntime {
  private static instance: IntelligenceRuntime;
  private workspaceRuntime: WorkspaceRuntime;
  private panelRuntime: PanelRuntime;
  private eventPlatform: EventPlatform;
  private statePlatform: StatePlatform;
  private intelligenceService: IntelligenceService;
  private context: IntelligenceContext;
  private state: IntelligenceState;
  private eventHandlers: IntelligenceEventHandlers;
  private initialized: boolean = false;
  private active: boolean = false;

  private constructor(
    workspaceRuntime: WorkspaceRuntime,
    panelRuntime: PanelRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform,
    intelligenceService: IntelligenceService
  ) {
    this.workspaceRuntime = workspaceRuntime;
    this.panelRuntime = panelRuntime;
    this.eventPlatform = eventPlatform;
    this.statePlatform = statePlatform;
    this.intelligenceService = intelligenceService;
    this.context = new IntelligenceContext(workspaceRuntime, panelRuntime);
    this.state = new IntelligenceState(statePlatform);
    this.eventHandlers = new IntelligenceEventHandlers(
      this.eventPlatform,
      this.context,
      this.state,
      this.intelligenceService,
      this
    );
  }

  static getInstance(
    workspaceRuntime: WorkspaceRuntime,
    panelRuntime: PanelRuntime,
    eventPlatform: EventPlatform,
    statePlatform: StatePlatform,
    intelligenceService: IntelligenceService
  ): IntelligenceRuntime {
    if (!IntelligenceRuntime.instance) {
      IntelligenceRuntime.instance = new IntelligenceRuntime(
        workspaceRuntime,
        panelRuntime,
        eventPlatform,
        statePlatform,
        intelligenceService
      );
    }
    return IntelligenceRuntime.instance;
  }

  initialize(): void {
    if (this.initialized) return;
    this.context.initialize();
    this.state.initialize();
    this.eventHandlers.register();
    this.initialized = true;
  }

  activate(): void {
    if (!this.initialized) throw new Error('Runtime not initialized');
    if (this.active) return;
    this.active = true;
    this.refresh();
  }

  refresh(): void {
    if (!this.active) return;
    const currentContext = this.context.getCurrentContext();
    const insights = this.intelligenceService.generateInsights(currentContext);
    const recommendations = this.intelligenceService.generateRecommendations(currentContext);
    this.state.updateInsights(insights);
    this.state.updateRecommendations(recommendations);
  }

  suspend(): void {
    this.active = false;
    this.eventHandlers.suspend();
  }

  resume(): void {
    if (!this.initialized) return;
    this.active = true;
    this.eventHandlers.resume();
    this.refresh();
  }

  dispose(): void {
    this.eventHandlers.unregister();
    this.state.clear();
    this.context.clear();
    this.initialized = false;
    this.active = false;
  }

  getContext() {
    return this.context.getCurrentContext();
  }

  getInsights() {
    return this.state.getInsights();
  }

  getRecommendations() {
    return this.state.getRecommendations();
  }

  getStatus() {
    return {
      initialized: this.initialized,
      active: this.active,
      workspace: this.context.getCurrentWorkspace(),
      panels: this.context.getActivePanels(),
      insightCount: this.state.getInsights().length,
      recommendationCount: this.state.getRecommendations().length,
    };
  }

  getDiagnostics() {
    return {
      runtime: this.getStatus(),
      context: this.context.getDiagnostics(),
      state: this.state.getDiagnostics(),
      service: this.intelligenceService.getDiagnostics(),
      events: this.eventHandlers.getDiagnostics(),
    };
  }

  onWorkspaceChange() {
    this.context.updateWorkspaceContext();
    this.refresh();
  }

  onPanelChange() {
    this.context.updatePanelContext();
    this.refresh();
  }

  /**
   * Simulation method for real-time data updates.
   * This is an extension for testing/visual demonstration and does not alter the core architecture.
   */
  simulateData(insights: Insight[], recommendations: Recommendation[]): void {
    if (!this.active) return;
    this.state.updateInsights(insights);
    this.state.updateRecommendations(recommendations);
  }
}
