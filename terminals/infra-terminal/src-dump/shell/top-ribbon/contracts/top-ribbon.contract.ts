/*
============================================================
COREI
Top Ribbon Contract
------------------------------------------------------------
Phase : 23
Layer : Shell
Component : Top Ribbon
============================================================
*/

export type ConnectionState =
  | "CONNECTED"
  | "DEGRADED"
  | "DISCONNECTED";

export type PlatformHealthState =
  | "HEALTHY"
  | "WARNING"
  | "CRITICAL";

export type EnvironmentType =
  | "PROD"
  | "UAT"
  | "DEV"
  | "PAPER"
  | "REPLAY"
  | "SIMULATION";

export type RegionType =
  | "GLOBAL"
  | "APAC"
  | "EMEA"
  | "AMER"
  | "INDIA"
  | "DUBAI"
  | "LONDON"
  | "SINGAPORE";

export interface RibbonIdentity {

  application: string;

  terminal: string;

  currentDomain: string;

}

export interface RibbonEnvironment {

  environment: EnvironmentType;

  region: RegionType;

  utcTime: string;

}

export interface RibbonPlatform {

  connection: ConnectionState;

  healthState: PlatformHealthState;

  healthPercent: number;

}

export interface RibbonCommandBar {

  terminalSwitcher: string;

  command: string;

  workspace: string;

  view: string;

  search: string;

}

export interface RibbonAwareness {

  criticalAlerts: number;

  highAlerts: number;

  mediumAlerts: number;

  eventRate: string;

  latency: string;

}

export interface RibbonOperator {

  user: string;

  role: string;

}

export interface TopRibbonContract {

  identity: RibbonIdentity;

  environment: RibbonEnvironment;

  platform: RibbonPlatform;

  commandBar: RibbonCommandBar;

  awareness: RibbonAwareness;

  operator: RibbonOperator;

}
