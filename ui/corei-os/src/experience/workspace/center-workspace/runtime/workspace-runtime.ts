export class WorkspaceRuntime {
  static switchWorkspace(current: string, next: string) {
    if (current === next) return current;
    return next;
  }
}
