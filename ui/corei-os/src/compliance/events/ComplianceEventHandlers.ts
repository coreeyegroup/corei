// src/compliance/events/ComplianceEventHandlers.ts
/**
 * COREI – Compliance Event Handlers
 * Stage-25 / Phase-25
 */
import { EventPlatform } from '../types';
import { ComplianceRuntime } from '../runtime/ComplianceRuntime';

export class ComplianceEventHandlers {
  private eventPlatform: EventPlatform;
  private runtime: ComplianceRuntime;
  private subscriptions: Array<{ event: string; handler: Function }> = [];
  private suspended: boolean = false;

  constructor(eventPlatform: EventPlatform, runtime: ComplianceRuntime) {
    this.eventPlatform = eventPlatform;
    this.runtime = runtime;
  }

  register(): void {
    const wsHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('workspace:changed', wsHandler);
    this.subscriptions.push({ event: 'workspace:changed', handler: wsHandler });

    const refreshHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('compliance:refresh', refreshHandler);
    this.subscriptions.push({ event: 'compliance:refresh', handler: refreshHandler });

    const identityHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('identity:changed', identityHandler);
    this.subscriptions.push({ event: 'identity:changed', handler: identityHandler });

    const governanceHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('governance:changed', governanceHandler);
    this.subscriptions.push({ event: 'governance:changed', handler: governanceHandler });
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
