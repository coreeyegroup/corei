import type { EnvironmentStateContract } from "../contracts/environment-state.contract";
import type { ReplayStateContract } from "../contracts/replay-state.contract";
import type { TerminalStateContract } from "../contracts/terminal-state.contract";
import type { WorkspaceStateContract } from "../contracts/workspace-state.contract";
import type { NavigationStateContract } from "../contracts/navigation-state.contract";
import type { ContextStateContract } from "../contracts/context-state.contract";
import type { SessionStateContract } from "../contracts/session-state.contract";
import type { UiStateContract } from "../contracts/ui-state.contract";
import type { PlatformStateContract } from "../contracts/platform-state.contract";

export interface RuntimeState {
  environment: EnvironmentStateContract;

  replay: ReplayStateContract;

  terminal: TerminalStateContract;

  workspace: WorkspaceStateContract;

  navigation: NavigationStateContract;

  context: ContextStateContract;

  session: SessionStateContract;

  ui: UiStateContract;

  platform: PlatformStateContract;
}
