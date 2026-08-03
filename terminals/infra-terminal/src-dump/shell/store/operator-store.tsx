import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

interface OperatorStore {

  activeToolId: string;

  setActiveToolId: (
    toolId: string
  ) => void;

  height: number;

  setHeight: (
    value: number
  ) => void;
}

const OperatorStoreContext =
  createContext<
    OperatorStore | undefined
  >(undefined);

export function OperatorStoreProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

  const [
    activeToolId,
    setActiveToolId
  ] =
    useState("terminal");

  const [
    height,
    setHeight
  ] =
    useState(180);

  return (

    <OperatorStoreContext.Provider
      value={{
        activeToolId,
        setActiveToolId,
        height,
        setHeight
      }}
    >

      {children}

    </OperatorStoreContext.Provider>

  );
}

export function useOperatorStore() {

  const context =
    useContext(
      OperatorStoreContext
    );

  if (!context) {

    throw new Error(
      "OperatorStoreProvider missing"
    );
  }

  return context;
}
