// src/governance/events/GovernanceEventHandlers.ts
/**
 * COREI – Governance Event Handlers
 * Stage-25 / Phase-24
 */
import { EventPlatform } from '../types';
import { GovernanceRuntime } from '../runtime/GovernanceRuntime';

export class GovernanceEventHandlers {
  private eventPlatform: EventPlatform;
  private runtime: GovernanceRuntime;
  private subscriptions: Array<{ event: string; handler: Function }> = [];
  private suspended: boolean = false;

  constructor(eventPlatform: EventPlatform, runtime: GovernanceRuntime) {
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
    this.eventPlatform.subscribe('governance:refresh', refreshHandler);
    this.subscriptions.push({ event: 'governance:refresh', handler: refreshHandler });

    const identityHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('identity:changed', identityHandler);
    this.subscriptions.push({ event: 'identity:changed', handler: identityHandler });
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
