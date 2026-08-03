import {
  useWindowStore
}
from "../store/window-store";

import {
  WindowRenderer
}
from "./WindowRenderer";

export function LayoutRenderer() {

  const {
    windows,
    activeWindowId
  } =
    useWindowStore();


  const desktopWindows =
    windows.filter(
      window =>
        window.window_type ===
        "desktop"
    );


  const workspaceWindows =
    windows.filter(
      window =>
        window.window_type ===
        "workspace" &&
        window.mode === "tab"
    );


  const activeWorkspace =
    workspaceWindows.find(
      window =>
        window.window_id ===
        activeWindowId
    ) ??
    workspaceWindows[
      workspaceWindows.length - 1
    ];


  const splitWindows =
    windows.filter(
      window =>
        window.mode ===
        "split"
    );


  const floatingWindows =
    windows.filter(
      window =>
        window.mode ===
        "floating"
    );


  return (

    <div className="layout-engine">

      {desktopWindows.map(
        window => (

          <div
            key={window.window_id}
            className="layout-desktop-layer"
          >

            <WindowRenderer
              window={window}
            />

          </div>

        )
      )}

      {activeWorkspace && (

        <div
          className="layout-workspace-layer"
        >

          <WindowRenderer
            window={activeWorkspace}
          />

        </div>

      )}

      {splitWindows.length > 0 && (

        <div
          className="layout-split-container"
        >

          {splitWindows.map(
            window => (

              <div
                key={
                  window.window_id
                }
                className="
                  layout-split-window
                "
              >

                <WindowRenderer
                  window={window}
                />

              </div>

            )
          )}

        </div>

      )}

      {floatingWindows.map(
        (
          window,
          index
        ) => (

          <div

            key={
              window.window_id
            }

            className="
              layout-floating-window
            "

            style={{

              top:
                120 +
                index * 40,

              left:
                180 +
                index * 40

            }}

          >

            <WindowRenderer
              window={window}
            />

          </div>

        )
      )}

    </div>

  );

}
