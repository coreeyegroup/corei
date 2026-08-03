import {
  createContext,
  useContext,
  useState,
  type ReactNode
}
from "react";

import type {
  DomainContextMenuContract
}
from "../contracts/domain-context-menu.contract";

interface DomainContextMenuStore {

  menu:
    DomainContextMenuContract;

  openMenu:
    (
      domainId: string,
      x: number,
      y: number
    ) => void;

  closeMenu:
    () => void;

}

const Context =
  createContext<
    DomainContextMenuStore | undefined
  >(undefined);

export function DomainContextMenuProvider(
  {
    children
  }: {
    children: ReactNode
  }
) {

  const [
    menu,
    setMenu
  ] =
    useState<
      DomainContextMenuContract
    >({
      visible: false,
      domain_id: "",
      x: 0,
      y: 0
    });

  function openMenu(
    domainId: string,
    x: number,
    y: number
  ) {

    setMenu({
      visible: true,
      domain_id: domainId,
      x,
      y
    });

  }

  function closeMenu() {

    setMenu({
      visible: false,
      domain_id: "",
      x: 0,
      y: 0
    });

  }

  return (

    <Context.Provider
      value={{
        menu,
        openMenu,
        closeMenu
      }}
    >

      {children}

    </Context.Provider>

  );

}

export function useDomainContextMenu() {

  const context =
    useContext(Context);

  if (!context) {

    throw new Error(
      "DomainContextMenuProvider missing"
    );

  }

  return context;

}
