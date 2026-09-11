/**
 * COREI – Intelligence Context
 * Stage-25 / Phase-22
 */
import { WorkspaceRuntime, PanelRuntime } from '../types';

export interface WorkspaceContext {
  workspaceId: string;
  workspaceName: string;
  workspaceType: string;
  activePanels: string[];
  panelDetails: Record<string, any>;
}

export class IntelligenceContext {
  private workspaceRuntime: WorkspaceRuntime;
  private panelRuntime: PanelRuntime;
  private currentContext: WorkspaceContext | null = null;

  constructor(workspaceRuntime: WorkspaceRuntime, panelRuntime: PanelRuntime) {
    this.workspaceRuntime = workspaceRuntime;
    this.panelRuntime = panelRuntime;
  }

  initialize(): void {
    this.updateContext();
  }

  updateWorkspaceContext(): void {
    this.updateContext();
  }

  updatePanelContext(): void {
    this.updateContext();
  }

  private updateContext(): void {
    const workspace = this.workspaceRuntime.getActiveWorkspace();
    if (!workspace) {
      this.currentContext = null;
      return;
    }
    const panels = this.panelRuntime.getActivePanels();
    this.currentContext = {
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      workspaceType: workspace.type || 'default',
      activePanels: panels.map((p: { id: string }) => p.id),
      panelDetails: panels.reduce((acc: Record<string, any>, p: { id: string; [key: string]: any }) => ({ ...acc, [p.id]: p }), {}),
    };
  }

  getCurrentContext(): WorkspaceContext | null {
    return this.currentContext;
  }

  getCurrentWorkspace(): any {
    return this.workspaceRuntime.getActiveWorkspace();
  }

  getActivePanels(): any[] {
    return this.panelRuntime.getActivePanels();
  }

  clear(): void {
    this.currentContext = null;
  }

  getDiagnostics() {
    return {
      hasContext: !!this.currentContext,
      workspaceId: this.currentContext?.workspaceId || null,
    };
  }
}
