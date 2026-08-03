/**
 * COREI OS — Stage 25 / Phase 03 / Step 05
 * Module: workspace-container
 * Layer: Layout
 * Responsibility: central workspace UI surface
 */

import React from "react";
import { useWorkspace } from "../provider/workspace-provider";

export const WorkspaceContainer = () => {

  const { state } = useWorkspace();

  return (
    <div style={{
      flex: 1,
      height: "100%",
      width: "100%",
      background: "#0a0a0a"
    }}>
      <div style={{ color: "#888", fontSize: 12, padding: 8 }}>
        ACTIVE WORKSPACE: {state.activeWorkspaceId}
      </div>
    </div>
  );
};
