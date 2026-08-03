/**
 * COREI OS — Stage 25 / Phase 03 / Step 05
 * Module: workspace-runtime
 * Layer: Runtime
 * Responsibility: workspace transition logic
 */

export class WorkspaceRuntime {

  static switchWorkspace(current: string, next: string) {
    if (current === next) return current;
    return next;
  }

}
