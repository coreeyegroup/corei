import {
  useState
}
from "react";

import {
  useWindowStore
}
from "../store/window-store";

import {
  AddWorkspaceButton
}
from "./AddWorkspaceButton";

export function WorkspaceTabs() {

  const {

    windows,

    activeWindowId,

    activateWindow,

    closeWindow,

    moveWindow

  } = useWindowStore();

  const [
    dragIndex,
    setDragIndex
  ] =
    useState<
      number | null
    >(null);

  return (

    <div className="workspace-tabs">

      {windows.map(
        (
          window,
          index
        ) => (

          <div
            key={window.window_id}
            draggable

            onDragStart={() =>
              setDragIndex(
                index
              )
            }

            onDragOver={
              event =>
                event.preventDefault()
            }

            onDrop={() => {

              if (
                dragIndex ===
                  null ||
                dragIndex ===
                  index
              ) {
                return;
              }

              moveWindow(
                dragIndex,
                index
              );

              setDragIndex(
                null
              );
            }}

            className={
              window.window_id ===
              activeWindowId
                ? "workspace-tab active"
                : "workspace-tab"
            }

            onClick={() =>
              activateWindow(
                window.window_id
              )
            }
          >

            <span>

              {window.title}

            </span>

            {!window.pinned && (

              <span
                className="workspace-close"
                onClick={
                  event => {

                    event.stopPropagation();

                    closeWindow(
                      window.window_id
                    );
                  }
                }
              >
                ×
              </span>

            )}

          </div>

        )
      )}

      <AddWorkspaceButton />

    </div>

  );

}