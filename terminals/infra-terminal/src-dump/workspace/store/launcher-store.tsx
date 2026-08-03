import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

interface LauncherStore {

  open: boolean;

  show: () => void;

  hide: () => void;

  toggle: () => void;
}

const LauncherContext =
  createContext<
    LauncherStore | undefined
  >(undefined);

export function LauncherProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

  const [
    open,
    setOpen
  ] = useState(false);

  return (

    <LauncherContext.Provider
      value={{
        open,

        show: () =>
          setOpen(true),

        hide: () =>
          setOpen(false),

        toggle: () =>
          setOpen(
            value => !value
          )
      }}
    >

      {children}

    </LauncherContext.Provider>

  );
}

export function useLauncher() {

  const context =
    useContext(
      LauncherContext
    );

  if (!context) {

    throw new Error(
      "LauncherProvider missing"
    );
  }

  return context;
}
