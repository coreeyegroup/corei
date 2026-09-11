// src/identity/events/IdentityEventHandlers.ts
/**
 * COREI – Identity Event Handlers
 * Stage-25 / Phase-23
 */
import { EventPlatform } from '../types';
import { IdentityRuntime } from '../runtime/IdentityRuntime';

export class IdentityEventHandlers {
  private eventPlatform: EventPlatform;
  private runtime: IdentityRuntime;
  private subscriptions: Array<{ event: string; handler: Function }> = [];
  private suspended: boolean = false;

  constructor(eventPlatform: EventPlatform, runtime: IdentityRuntime) {
    this.eventPlatform = eventPlatform;
    this.runtime = runtime;
  }

  register(): void {
    // Workspace changes
    const wsHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('workspace:changed', wsHandler);
    this.subscriptions.push({ event: 'workspace:changed', handler: wsHandler });

    // Identity refresh requests
    const refreshHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('identity:refresh', refreshHandler);
    this.subscriptions.push({ event: 'identity:refresh', handler: refreshHandler });

    // Role changes
    const roleHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('role:changed', roleHandler);
    this.subscriptions.push({ event: 'role:changed', handler: roleHandler });
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
