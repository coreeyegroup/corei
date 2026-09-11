/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * PART-12
 * BUILD-06
 *
 * FILE:
 * index.ts
 *
 * PURPOSE:
 * Public API for the COREI Platform Kernel.
 *
 * DESCRIPTION:
 * Exposes the complete Platform Kernel through a single,
 * authoritative entry point.
 *
 * IMPORTANT
 * ----------
 * All subsystems must consume the Platform Kernel through
 * this file only.
 *
 * OWNERSHIP:
 * Platform Kernel
 *
 ******************************************************************************/

/*=============================================================================
    CONTRACTS
=============================================================================*/

export * from "./contracts/platform-kernel-contract";

/*=============================================================================
    COMPOSITION
=============================================================================*/

export * from "./composition/platform-kernel";

/*=============================================================================
    RUNTIME
=============================================================================*/

export * from "./runtime/platform-kernel-runtime";

/*=============================================================================
    REGISTRY
=============================================================================*/

export * from "./registry/platform-kernel-registry";

/*=============================================================================
    BOOTSTRAP
=============================================================================*/

export * from "./bootstrap/platform-bootstrap";
