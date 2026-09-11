/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Module      : Platform Bootstrap
 * File        : bootstrap.ts
 * Purpose     : Authoritative platform bootstrap controller.
 *
 * Copyright (c) Core Eye Systems.
 * Confidential & Proprietary.
 * =============================================================================
 */

/**
 * Bootstrap configuration options.
 */

export interface BootstrapOptions {
    mode: "development" | "production";
}
