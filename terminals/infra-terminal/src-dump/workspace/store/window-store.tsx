import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

import type {
  WindowContract,
  WindowMode
}
from "../contracts/window.contract";

import {
  resolveDesktopBootstrap
}
from "../../bootstrap/desktop-bootstrap";


interface WindowStore {

  activeWindowId:
    string;

  windows:
    WindowContract[];

  activateWindow:
    (
      windowId: string
    ) => void;

  openWindow:
    (
      templateId: string,
      title: string,
      viewId: string,
      domainId?: string
    ) => void;

  closeWindow:
    (
      windowId: string
    ) => void;

  moveWindow:
    (
      fromIndex: number,
      toIndex: number
    ) => void;

  detachWindow:
    (
      windowId: string
    ) => void;

  splitWindow:
    (
      windowId: string
    ) => void;

  dockWindow:
    (
      windowId: string
    ) => void;

}


const WindowStoreContext =
  createContext<
    WindowStore | undefined
  >(undefined);



export function WindowStoreProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

  const now =
    new Date().toISOString();

  const bootstrap =
    resolveDesktopBootstrap();

  const startupDomainId =
    bootstrap.domainId;

  const startupDesktopId =
    bootstrap.desktopId;


  const [
    activeWindowId,
    setActiveWindowId
  ] =
    useState<string>(
      startupDesktopId
    );


  const [
    windows,
    setWindows
  ] =
    useState<WindowContract[]>([

      {

        window_id:
          startupDesktopId,

        template_id:
          startupDesktopId,

        title:
          `${startupDomainId.toUpperCase()} Desktop`,

        view_id:
          startupDesktopId,

        domain_id:
          startupDomainId,

        parent_window_id:
          null,

        window_type:
          "desktop",

        mode:
          "tab",

        instance_number:
          1,

        dirty:
          false,

        pinned:
          true,

        active:
          true,

        position:
        {
          x: 0,
          y: 0
        },

        size:
        {
          width: 1200,
          height: 800
        },

        z_index:
          1,

        created_at:
          now,

        updated_at:
          now

      }

    ]);


  function activateWindow(
    windowId: string
  ) {

    setActiveWindowId(
      windowId
    );

  }


  function openWindow(
    templateId: string,
    title: string,
    viewId: string,
    domainId = "d01"
  ) {

    const timestamp =
      new Date().toISOString();

    setWindows(
      (
        current: WindowContract[]
      ) => {

        const instance =
          current.filter(
            (
              item: WindowContract
            ) =>
              item.template_id ===
              templateId
          ).length + 1;


        const newWindow:
        WindowContract = {

          window_id:
            `${templateId}-${instance}`,

          template_id:
            templateId,

          title,

          view_id:
            viewId,

          domain_id:
            domainId,

          parent_window_id:
            `${domainId}-desktop`,

          window_type:
            templateId.includes(
              "desktop"
            )
              ? "desktop"
              : "workspace",

          mode:
            "tab",

          instance_number:
            instance,

          dirty:
            false,

          pinned:
            templateId.includes(
              "desktop"
            ),

          active:
            true,

          position:
          {
            x: 120,
            y: 120
          },

          size:
          {
            width: 1000,
            height: 700
          },

          z_index:
            current.length + 1,

          created_at:
            timestamp,

          updated_at:
            timestamp

        };

        return [
          ...current,
          newWindow
        ];

      }
    );

  }

  function closeWindow(
    windowId: string
  ) {

    setWindows(
      (
        current: WindowContract[]
      ) =>
        current.filter(
          (
            item: WindowContract
          ) =>
            item.window_id !==
              windowId ||
            item.pinned
        )
    );

  }


  function updateMode(
    windowId: string,
    mode: WindowMode
  ) {

    setWindows(
      (
        current: WindowContract[]
      ) =>
        current.map(
          (
            item: WindowContract
          ) =>

            item.window_id ===
            windowId

              ? {
                  ...item,
                  mode,
                  updated_at:
                    new Date()
                      .toISOString()
                }

              : item
        )
    );

  }


  function detachWindow(
    windowId: string
  ) {

    updateMode(
      windowId,
      "floating"
    );

  }


  function splitWindow(
    windowId: string
  ) {

    updateMode(
      windowId,
      "split"
    );

  }


  function dockWindow(
    windowId: string
  ) {

    updateMode(
      windowId,
      "tab"
    );

  }


  function moveWindow(
    fromIndex: number,
    toIndex: number
  ) {

    setWindows(
      (
        current: WindowContract[]
      ) => {

        const updated =
          [...current];

        const [
          item
        ] =
          updated.splice(
            fromIndex,
            1
          );

        updated.splice(
          toIndex,
          0,
          item
        );

        return updated;

      }
    );

  }


  return (

    <WindowStoreContext.Provider

      value={{

        activeWindowId,

        windows,

        activateWindow,

        openWindow,

        closeWindow,

        moveWindow,

        detachWindow,

        splitWindow,

        dockWindow

      }}

    >

      {children}

    </WindowStoreContext.Provider>

  );

}

export function useWindowStore() {

  const context =
    useContext(
      WindowStoreContext
    );

  if (!context) {

    throw new Error(
      "WindowStoreProvider missing"
    );

  }

  return context;

}
