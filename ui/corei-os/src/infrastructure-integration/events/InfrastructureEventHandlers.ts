// src/infrastructure-integration/events/InfrastructureEventHandlers.ts
/**
 * COREI – Infrastructure Integration Event Handlers
 * Stage-25 / Phase-26
 */
import { EventPlatform } from '../types';
import { InfrastructureRuntime } from '../runtime/InfrastructureRuntime';

export class InfrastructureEventHandlers {
  private eventPlatform: EventPlatform;
  private runtime: InfrastructureRuntime;
  private subscriptions: Array<{ event: string; handler: Function }> = [];
  private suspended: boolean = false;

  constructor(eventPlatform: EventPlatform, runtime: InfrastructureRuntime) {
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
    this.eventPlatform.subscribe('infrastructure:refresh', refreshHandler);
    this.subscriptions.push({ event: 'infrastructure:refresh', handler: refreshHandler });

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

    const complianceHandler = () => {
      if (this.suspended) return;
      this.runtime.refresh();
    };
    this.eventPlatform.subscribe('compliance:changed', complianceHandler);
    this.subscriptions.push({ event: 'compliance:changed', handler: complianceHandler });
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
