/**
 * COREI – Intelligence Event Handlers
 * Stage-25 / Phase-22 / Step-08
 */
import { EventPlatform } from '../types';
import { IntelligenceContext } from '../context/IntelligenceContext';
import { IntelligenceState } from '../state/IntelligenceState';
import { IntelligenceService } from '../right-panel/services/intelligence-service';
import { IntelligenceRuntime } from '../right-panel/runtime/intelligence-runtime';

export class IntelligenceEventHandlers {
  private eventPlatform: EventPlatform;
  private context: IntelligenceContext;
  private state: IntelligenceState;
  private service: IntelligenceService;
  private runtime: IntelligenceRuntime;
  private subscriptions: Array<{ event: string; handler: Function }> = [];
  private suspended: boolean = false;

  constructor(
    eventPlatform: EventPlatform,
    context: IntelligenceContext,
    state: IntelligenceState,
    service: IntelligenceService,
    runtime: IntelligenceRuntime
  ) {
    this.eventPlatform = eventPlatform;
    this.context = context;
    this.state = state;
    this.service = service;
    this.runtime = runtime;
  }

  register(): void {
    const wsHandler = (data: any) => {
      if (this.suspended) return;
      this.context.updateWorkspaceContext();
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('workspace:changed', wsHandler);
    this.subscriptions.push({ event: 'workspace:changed', handler: wsHandler });

    const panelHandler = (data: any) => {
      if (this.suspended) return;
      this.context.updatePanelContext();
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('panel:changed', panelHandler);
    this.subscriptions.push({ event: 'panel:changed', handler: panelHandler });

    const refreshHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('intelligence:refresh', refreshHandler);
    this.subscriptions.push({ event: 'intelligence:refresh', handler: refreshHandler });
  }

  suspend(): void {
    this.suspended = true;
  }

  resume(): void {
    this.suspended = false;
    this.runtime.refresh();
  }

  unregister(): void {
    for (const sub of this.subscriptions) {
      this.eventPlatform.unsubscribe(sub.event, sub.handler);
    }
    this.subscriptions = [];
    this.suspended = false;
  }

  getDiagnostics() {
    return { subscriptions: this.subscriptions.length, suspended: this.suspended };
  }
}
