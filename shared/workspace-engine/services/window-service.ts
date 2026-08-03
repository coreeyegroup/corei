import { windowState }
from "../runtime/window-state";

export function openWindow(
  windowId: string,
  title: string,
  viewId: string
) {

  const existing =
    windowState.windows.find(
      w => w.window_id === windowId
    );

  if (existing) {

    windowState.active_window_id =
      windowId;

    return;
  }

  windowState.windows.push({
    window_id: windowId,

    title,

    workspace_id: "infra",

    view_id: viewId,

    resource_id: null,

    resource_type: null,

    dirty: false,

    pinned: false
  });

  windowState.active_window_id =
    windowId;
}

export function activateWindow(
  windowId: string
) {
  windowState.active_window_id =
    windowId;
}
