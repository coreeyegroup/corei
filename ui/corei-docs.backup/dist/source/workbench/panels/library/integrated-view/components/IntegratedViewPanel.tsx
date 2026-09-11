import React from "react";
import { useIntegratedView } from "../hooks/useIntegratedView";

export function IntegratedViewPanel() {
  const { data } = useIntegratedView();
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Integrated Institutional View</h2>
      <p className="text-sm text-gray-500">Consolidated view of all platform components.</p>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="border p-2">Capabilities: {data.capabilities}</div>
        <div className="border p-2">Providers: {data.providers}</div>
        <div className="border p-2">Bindings: {data.bindings}</div>
      </div>
    </div>
  );
}
