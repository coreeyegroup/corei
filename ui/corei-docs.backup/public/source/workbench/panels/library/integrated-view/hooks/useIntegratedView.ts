import { useState, useEffect } from "react";
import { ProviderManager } from "@/providers";
import { CapabilityManager } from "@/capabilities";
import { CapabilityProviderBindingRegistry } from "@/capabilities/integration";

export function useIntegratedView() {
  const [data, setData] = useState({ capabilities: 0, providers: 0, bindings: 0 });
  useEffect(() => {
    const providers = new ProviderManager().getAll().length;
    const capabilities = new CapabilityManager().getAll().length;
    const bindings = new CapabilityProviderBindingRegistry().getAll().length;
    setData({ providers, capabilities, bindings });
  }, []);
  return { data };
}
