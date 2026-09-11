import React from "react";
import { useConsumptionViewer } from "../hooks/useConsumptionViewer";

export function ConsumptionViewerPanel() {
  const { items } = useConsumptionViewer();
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Consumption Viewer</h2>
      <p className="text-sm text-gray-500">View which capabilities are consumed by which consumers.</p>
      <div className="mt-4">Total consumers: {items.length}</div>
    </div>
  );
}
