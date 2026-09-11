import { useState, useEffect } from "react";
import { consumptionViewerAdapter } from "../services/consumption-viewer-adapter";

interface ConsumptionItem {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  consumers: string[];
}

export function useConsumptionViewer() {
  const [items, setItems] = useState<ConsumptionItem[]>([]);
  useEffect(() => {
    setItems(consumptionViewerAdapter.load());
  }, []);
  return { items };
}
