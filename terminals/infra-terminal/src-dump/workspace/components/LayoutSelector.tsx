import {
  useState
}
from "react";

import {
  useLayoutStore
}
from "../store/layout-store";

export function LayoutSelector() {

  const {
    layoutMode,
    setLayoutMode
  } =
    useLayoutStore();

  const [
    open,
    setOpen
  ] =
    useState(false);

  const layouts = [

    {
      id: "focused",
      label: "Focused"
    },

    {
      id: "vertical",
      label: "Vertical"
    },

    {
      id: "horizontal",
      label: "Horizontal"
    },

    {
      id: "quad",
      label: "Quad"
    },

    {
      id: "freeform",
      label: "Freeform"
    }

  ];

  return (

    <div className="layout-selector">

      <div
        className="layout-trigger"
        onClick={() =>
          setOpen(!open)
        }
      >
        ◫
      </div>

      {open && (

        <div className="layout-menu">

          {layouts.map(
            layout => (

              <div
                key={layout.id}
                className={
                  layoutMode ===
                  layout.id
                    ? "layout-menu-item active"
                    : "layout-menu-item"
                }
                onClick={() => {

                  setLayoutMode(
                    layout.id as any
                  );

                  setOpen(false);

                }}
              >

                {layout.label}

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}