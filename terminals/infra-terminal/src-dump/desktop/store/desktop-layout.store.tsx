import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

import type {
  DesktopLayoutContract
}
from "../contracts/desktop-layout.contract";

interface DesktopLayoutStore {

  layout:
    DesktopLayoutContract;

  moveTile:
    (
      windowId: string,
      gridX: number,
      gridY: number
    ) => void;

}

const DesktopLayoutContext =
  createContext<
    DesktopLayoutStore | undefined
  >(undefined);

export function DesktopLayoutProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

const [
  layout,
  setLayout
] =
  useState<DesktopLayoutContract>(
    {
      desktop_id:
        "d01-desktop",

      items: [

        {
          window_id: "cluster-health",
          grid_x: 0,
          grid_y: 0,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "nodes",
          grid_x: 4,
          grid_y: 0,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "workloads",
          grid_x: 8,
          grid_y: 0,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "events",
          grid_x: 0,
          grid_y: 3,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "topology",
          grid_x: 4,
          grid_y: 3,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "capacity",
          grid_x: 8,
          grid_y: 3,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "alerts",
          grid_x: 0,
          grid_y: 6,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "resources",
          grid_x: 4,
          grid_y: 6,
          grid_w: 4,
          grid_h: 3
        },

        {
          window_id: "governance",
          grid_x: 8,
          grid_y: 6,
          grid_w: 4,
          grid_h: 3
        }

      ]
    }
  );

  function moveTile(
    windowId: string,
    gridX: number,
    gridY: number
  ) {

    setLayout(
      current => ({

        ...current,

        items:
          current.items.map(
            item =>

              item.window_id ===
              windowId

                ? {
                    ...item,
                    grid_x: gridX,
                    grid_y: gridY
                  }

                : item
          )

      })
    );

  }

  return (

    <DesktopLayoutContext.Provider
      value={{
        layout,
        moveTile
      }}
    >

      {children}

    </DesktopLayoutContext.Provider>

  );

}

export function useDesktopLayoutStore() {

  const context =
    useContext(
      DesktopLayoutContext
    );

  if (!context) {

    throw new Error(
      "DesktopLayoutProvider missing"
    );

  }

  return context;

}
