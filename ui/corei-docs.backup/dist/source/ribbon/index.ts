/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-02
 *
 * FILE:
 * index.ts
 *
 * PURPOSE:
 * Ribbon Public API
 *
 ******************************************************************************/

export * from "./contracts/ribbon-contract";
export * from "./models/ribbon-model";

export * from "./components/TopRibbon";
export * from "./components/RibbonBrand";
export * from "./components/RibbonWorkspace";
export * from "./components/RibbonSearch";
export * from "./components/RibbonRuntime";
export * from "./components/RibbonNotifications";
export * from "./components/RibbonClock";
export * from "./components/RibbonUser";


export * from "./contracts/shell-header-context-contract";
export * from "./models/default-shell-header-context";

export * from "./components/RibbonInstitutionIdentity";
export * from "./components/RibbonEnvironmentIdentity";
export * from "./components/RibbonSessionContext";
export * from "./components/RibbonOperatingContext";
export * from "./components/RibbonShellHeaderDetail";

/* -------------------------------------------------------------------------- */
/* STEP-16 — Ribbon Micro Implementation                                       */
/* -------------------------------------------------------------------------- */

export * from "./contracts/ribbon-micro-contract";
export * from "./models/default-ribbon-micro-model";

export * from "./components/RibbonAction";
export * from "./components/RibbonGroup";
export * from "./components/RibbonStatusSurface";
export * from "./components/RibbonContextualControl";
export * from "./components/RibbonMicroSurface";
