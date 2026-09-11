/**
 * COREI OS — Stage 25 / Phase 03 / Step 05
 * Module: workspace-provider
 * Layer: Provider
 * Responsibility: React workspace context boundary
 */

import React, { createContext, useContext, useState } from "react";
import { WorkspaceState } from "../core/workspace-state";

const WorkspaceContext = createContext<any>(null);

export const WorkspaceProvider = ({ children }: any) => {

  const [state, setState] = useState<WorkspaceState>({
    activeWorkspaceId: null,
    activeDomain: null,
    mountedModules: [],
    lastUpdated: Date.now()
  });

  return (
    <WorkspaceContext.Provider value={{ state, setState }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
