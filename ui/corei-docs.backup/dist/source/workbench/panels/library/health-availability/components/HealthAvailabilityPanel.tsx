import React from "react";
import { useHealthAvailability } from "../hooks/useHealthAvailability";

export function HealthAvailabilityPanel() {
  const { items } = useHealthAvailability();
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Health & Availability Centre</h2>
      <p className="text-sm text-gray-500">Monitoring provider health and availability.</p>
      <div className="mt-4">Total providers: {items.length}</div>
    </div>
  );
}
