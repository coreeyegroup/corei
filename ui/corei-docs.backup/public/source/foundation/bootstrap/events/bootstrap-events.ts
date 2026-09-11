/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Module      : Platform Bootstrap
 * File        : bootstrap-events.ts
 * Purpose     : Defines the authoritative bootstrap events.
 *
 * Copyright (c) Core Eye Systems.
 * Confidential & Proprietary.
 * =============================================================================
 */

/**
 * Platform bootstrap events.
 */
export enum BootstrapEvent {
  CREATED = "BOOT_CREATED",
  STARTED = "BOOT_STARTED",
  INITIALIZING = "BOOT_INITIALIZING",
  READY = "BOOT_READY",
  RUNNING = "BOOT_RUNNING",
  STOPPING = "BOOT_STOPPING",
  STOPPED = "BOOT_STOPPED",
  FAILED = "BOOT_FAILED",
}
