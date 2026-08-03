import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

import type {
  LayoutMode
}
from "../contracts/layout.contract";

interface LayoutStore {

  layoutMode: LayoutMode;

  setLayoutMode: (
    mode: LayoutMode
  ) => void;
}

const LayoutStoreContext =
  createContext<
    LayoutStore | undefined
  >(undefined);

export function LayoutStoreProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

  const [
    layoutMode,
    setLayoutMode
  ] =
    useState<LayoutMode>(
      "focused"
    );

  return (

    <LayoutStoreContext.Provider
      value={{
        layoutMode,
        setLayoutMode
      }}
    >

      {children}

    </LayoutStoreContext.Provider>

  );
}

export function useLayoutStore() {

  const context =
    useContext(
      LayoutStoreContext
    );

  if (!context) {

    throw new Error(
      "LayoutStoreProvider missing"
    );
  }

  return context;
}
