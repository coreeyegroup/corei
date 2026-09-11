import { ProviderManager } from "@/providers";

export class HealthAvailabilityAdapter {
  private manager = new ProviderManager();
  load() {
    return this.manager.getAll().map(p => ({ ...p, health: "Healthy" }));
  }
}
export const healthAvailabilityAdapter = new HealthAvailabilityAdapter();
