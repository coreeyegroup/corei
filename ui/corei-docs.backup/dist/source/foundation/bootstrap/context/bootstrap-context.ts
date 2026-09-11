/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Module      : Platform Bootstrap
 * File        : bootstrap-context.ts
 * Purpose     : Shared bootstrap context used throughout platform startup.
 *
 * Copyright (c) Core Eye Systems.
 * Confidential & Proprietary.
 * =============================================================================
 */

import { BootstrapLifecycle } from "../lifecycle/lifecycle";

/**
 * Shared platform bootstrap context.
 */
export interface BootstrapContext {
  /** Unique bootstrap session identifier */
  id: string;

  /** Platform startup mode */
  mode: "development" | "production";

  /** Current lifecycle state */
  lifecycle: BootstrapLifecycle;

  /** Bootstrap start time */
  startedAt: Date;

  /** Platform version */
  version: string;
}
