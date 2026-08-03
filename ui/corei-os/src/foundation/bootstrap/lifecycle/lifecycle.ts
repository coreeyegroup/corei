/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Module      : Platform Bootstrap
 * File        : lifecycle.ts
 * Purpose     : Defines the authoritative platform bootstrap lifecycle.
 *
 * Copyright (c) Core Eye Systems.
 * Confidential & Proprietary.
 * =============================================================================
 */

/**
 * Platform bootstrap lifecycle states.
 */
export enum BootstrapLifecycle {
  CREATED = "CREATED",
  STARTING = "STARTING",
  INITIALIZING = "INITIALIZING",
  READY = "READY",
  RUNNING = "RUNNING",
  STOPPING = "STOPPING",
  STOPPED = "STOPPED",
  FAILED = "FAILED",
}
