import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

import type {
  DesktopMode
}
from "../contracts/desktop-mode.contract";

interface DesktopModeStore {

  mode:
    DesktopMode;

  enterEditMode:
    () => void;

  enterViewMode:
    () => void;

  toggleMode:
    () => void;

}

const DesktopModeContext =
  createContext<
    DesktopModeStore | undefined
  >(undefined);

export function DesktopModeProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

  const [
    mode,
    setMode
  ] =
    useState<DesktopMode>(
      "view"
    );

  function enterEditMode() {

    setMode(
      "edit"
    );

  }

  function enterViewMode() {

    setMode(
      "view"
    );

  }

  function toggleMode() {

    setMode(
      current =>

        current === "view"
          ? "edit"
          : "view"
    );

  }

  return (

    <DesktopModeContext.Provider
      value={{
        mode,
        enterEditMode,
        enterViewMode,
        toggleMode
      }}
    >

      {children}

    </DesktopModeContext.Provider>

  );

}

export function useDesktopModeStore() {

  const context =
    useContext(
      DesktopModeContext
    );

  if (!context) {

    throw new Error(
      "DesktopModeProvider missing"
    );

  }

  return context;

}