import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

interface DesktopStore {

  activeDesktopId:
    string;

  setActiveDesktopId: (
    desktopId: string
  ) => void;
}

const DesktopStoreContext =
  createContext<
    DesktopStore | undefined
  >(undefined);

export function DesktopStoreProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

  const [
    activeDesktopId,
    setActiveDesktopId
  ] =
    useState(
      "cluster-desktop"
    );

  return (

    <DesktopStoreContext.Provider
      value={{
        activeDesktopId,
        setActiveDesktopId
      }}
    >

      {children}

    </DesktopStoreContext.Provider>

  );
}

export function useDesktopStore() {

  const context =
    useContext(
      DesktopStoreContext
    );

  if (!context) {

    throw new Error(
      "DesktopStoreProvider missing"
    );
  }

  return context;
}
