import React from 'react';
import { useWorkspace } from '../provider/workspace-provider';

export const WorkspaceContainer = () => {
  const { state } = useWorkspace();

  return (
    <div className="flex-1 h-full w-full bg-black">
      <div className="text-xs text-gray-400 p-2">
        ACTIVE WORKSPACE: {state.activeWorkspaceId}
      </div>
    </div>
  );
};
