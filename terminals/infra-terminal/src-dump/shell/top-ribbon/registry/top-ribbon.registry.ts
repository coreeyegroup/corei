/*
============================================================
COREI
Top Ribbon Registry
------------------------------------------------------------
Phase : 23
Layer : Shell
Component : Top Ribbon
============================================================
*/

export type RibbonRow =
  | "ROW_01"
  | "ROW_02";

export interface RibbonZone {

  id: string;

  row: RibbonRow;

  order: number;

  title: string;

}

export const TOP_RIBBON_REGISTRY: RibbonZone[] = [

  {
    id: "application",
    row: "ROW_01",
    order: 1,
    title: "COREI"
  },

  {
    id: "terminal",
    row: "ROW_01",
    order: 2,
    title: "Terminal"
  },

  {
    id: "domain",
    row: "ROW_01",
    order: 3,
    title: "Domain"
  },

  {
    id: "environment",
    row: "ROW_01",
    order: 4,
    title: "Environment"
  },

  {
    id: "region",
    row: "ROW_01",
    order: 5,
    title: "Region"
  },

  {
    id: "utc",
    row: "ROW_01",
    order: 6,
    title: "UTC"
  },

  {
    id: "connection",
    row: "ROW_01",
    order: 7,
    title: "Connection"
  },

  {
    id: "health",
    row: "ROW_01",
    order: 8,
    title: "Platform Health"
  },

  {
    id: "terminal-switcher",
    row: "ROW_02",
    order: 1,
    title: "Terminal"
  },

  {
    id: "command",
    row: "ROW_02",
    order: 2,
    title: "Command"
  },

  {
    id: "workspace",
    row: "ROW_02",
    order: 3,
    title: "Workspace"
  },

  {
    id: "view",
    row: "ROW_02",
    order: 4,
    title: "View"
  },

  {
    id: "search",
    row: "ROW_02",
    order: 5,
    title: "Search"
  },

  {
    id: "alerts",
    row: "ROW_02",
    order: 6,
    title: "Alerts"
  },

  {
    id: "event-rate",
    row: "ROW_02",
    order: 7,
    title: "Event Rate"
  },

  {
    id: "latency",
    row: "ROW_02",
    order: 8,
    title: "Latency"
  },

  {
    id: "user",
    row: "ROW_02",
    order: 9,
    title: "User"
  },

  {
    id: "role",
    row: "ROW_02",
    order: 10,
    title: "Role"
  }

];
