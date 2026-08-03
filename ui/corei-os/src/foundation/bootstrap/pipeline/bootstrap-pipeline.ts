/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Module      : Platform Bootstrap
 * File        : bootstrap-pipeline.ts
 * Purpose     : Defines the authoritative bootstrap execution pipeline.
 *
 * Copyright (c) Core Eye Systems.
 * Confidential & Proprietary.
 * =============================================================================
 */

/**
 * Bootstrap execution stages.
 *
 * Every future platform service registers against one of these stages.
 */
export enum BootstrapPipelineStage {
  CONFIGURATION = "CONFIGURATION",
  SERVICES = "SERVICES",
  PROVIDERS = "PROVIDERS",
  RUNTIME = "RUNTIME",
  SHELL = "SHELL",
  READY = "READY",
}
