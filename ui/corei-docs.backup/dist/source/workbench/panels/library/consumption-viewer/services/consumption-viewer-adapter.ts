import { CapabilityManager } from "@/capabilities";

export class ConsumptionViewerAdapter {
  private manager = new CapabilityManager();
  load() {
    return this.manager.getAll().map(c => ({ ...c, consumers: [] }));
  }
}
export const consumptionViewerAdapter = new ConsumptionViewerAdapter();
