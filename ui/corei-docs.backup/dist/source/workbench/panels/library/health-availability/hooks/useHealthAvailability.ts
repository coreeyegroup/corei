import { useState, useEffect } from "react";
import { healthAvailabilityAdapter } from "../services/health-availability-adapter";

interface HealthItem {
  id: string;
  name: string;
  version: string;
  vendor: string;
  enabled: boolean;
  health: string;
}

export function useHealthAvailability() {
  const [items, setItems] = useState<HealthItem[]>([]);
  useEffect(() => {
    setItems(healthAvailabilityAdapter.load());
  }, []);
  return { items };
}
