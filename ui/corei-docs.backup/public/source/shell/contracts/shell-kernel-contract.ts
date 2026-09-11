/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-kernel-contract.ts
 *
 * PURPOSE:
 * Institutional Shell Kernel Consumption Contract
 *
 * DESCRIPTION:
 * Defines every Platform Kernel consumed by the Institutional Shell.
 *
 * IMPORTANT
 * ----------
 * The Shell NEVER owns platform implementations.
 *
 * The Shell ONLY consumes certified Platform Kernel services.
 *
 * OWNERSHIP:
 * Platform Kernel
 *
 ******************************************************************************/

/*=============================================================================
    PROVIDER PLATFORM
=============================================================================*/

export interface ProviderPlatformKernel {

    readonly registry: unknown;

    readonly lifecycle: unknown;

}

/*=============================================================================
    CAPABILITY PLATFORM
=============================================================================*/

export interface CapabilityPlatformKernel {

    readonly registry: unknown;

    readonly resolver: unknown;

}

/*=============================================================================
    COGNITIVE PLATFORM
=============================================================================*/

export interface CognitivePlatformKernel {

    readonly runtime: unknown;

}

/*=============================================================================
    WORKSPACE PLATFORM
=============================================================================*/

export interface WorkspacePlatformKernel {

    readonly registry: unknown;

    readonly runtime: unknown;

}

/*=============================================================================
    APPLICATION PLATFORM
=============================================================================*/

export interface ApplicationPlatformKernel {

    readonly registry: unknown;

}

/*=============================================================================
    SERVICE PLATFORM
=============================================================================*/

export interface ServicePlatformKernel {

    readonly registry: unknown;

}

/*=============================================================================
    MODULE PLATFORM
=============================================================================*/

export interface ModulePlatformKernel {

    readonly registry: unknown;

}

/*=============================================================================
    ENGINE PLATFORM
=============================================================================*/

export interface EnginePlatformKernel {

    readonly registry: unknown;

}

/*=============================================================================
    DOMAIN PLATFORM
=============================================================================*/

export interface DomainPlatformKernel {

    readonly registry: unknown;

}

/*=============================================================================
    EVENT PLATFORM
=============================================================================*/

export interface EventPlatformKernel {

    readonly bus: unknown;

}

/*=============================================================================
    STATE PLATFORM
=============================================================================*/

export interface StatePlatformKernel {

    readonly state: unknown;

}

/*=============================================================================
    PLATFORM REGISTRY
=============================================================================*/

export interface RegistryPlatformKernel {

    readonly registry: unknown;

}

/*=============================================================================
    SHELL KERNEL CONTRACT
=============================================================================*/

export interface ShellKernelContract {

    readonly providers: ProviderPlatformKernel;

    readonly capabilities: CapabilityPlatformKernel;

    readonly cognition: CognitivePlatformKernel;

    readonly workspace: WorkspacePlatformKernel;

    readonly applications: ApplicationPlatformKernel;

    readonly services: ServicePlatformKernel;

    readonly modules: ModulePlatformKernel;

    readonly engines: EnginePlatformKernel;

    readonly domains: DomainPlatformKernel;

    readonly events: EventPlatformKernel;

    readonly state: StatePlatformKernel;

    readonly registry: RegistryPlatformKernel;

}
