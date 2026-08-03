/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 *
 * Repository Reality:
 * Read-only Runtime Readiness Monitor
 * =============================================================================
 */

import {
    CapabilityProviderBindingRegistry,
    CapabilityProviderResolver,
    CapabilityProviderLifecycleIntegration,
    CapabilityProviderRuntimeIntegration,
    type CapabilityProviderRuntimeResult
} from "@/capabilities/integration";

import {
    UIProviderManager,
    DefaultUIProviderLifecycle
} from "@/providers";

import type {
    ProviderRuntime
} from "@/providers";

export interface RuntimeMonitorItem {

    readonly capabilityId: string;

    readonly status:
        | "capability_unresolved"
        | "provider_not_found"
        | "lifecycle_ineligible"
        | "runtime_ineligible"
        | "runtime_eligible";

    readonly providerId?: string;

    readonly initialized?: boolean;

    readonly loaded?: boolean;

}

export class RuntimeMonitorAdapter {

    private readonly bindingRegistry =
        new CapabilityProviderBindingRegistry();

    private readonly resolver =
        new CapabilityProviderResolver(
            this.bindingRegistry
        );

    private readonly lifecycle =
        new CapabilityProviderLifecycleIntegration(
            new UIProviderManager(),
            DefaultUIProviderLifecycle
        );

    public constructor(

        private readonly runtimeResolver: {

            resolve(
                providerId: string
            ): ProviderRuntime | undefined;

        }

    ) {}

    public load():
    readonly RuntimeMonitorItem[] {

        return this.bindingRegistry
            .getAll()
            .map(
                binding => binding.capabilityId
            )
            .filter(
                (value, index, self) =>
                    self.indexOf(value) === index
            )
            .map(
                capabilityId => {

                    const lifecycleResult =
                        this.lifecycle.evaluate(
                            this.resolver.resolve(
                                capabilityId
                            )
                        );

                    if (
                        lifecycleResult.status !==
                        "lifecycle_eligible"
                    ) {

                        return this.toItem(
                            lifecycleResult
                        );

                    }

                    const runtime =
                        this.runtimeResolver.resolve(
                            lifecycleResult.providerId
                        );

                    if (!runtime) {

                        return {

                            capabilityId:
                                lifecycleResult.capabilityId,

                            providerId:
                                lifecycleResult.providerId,

                            status:
                                "runtime_ineligible"

                        };

                    }

                    const integration =
                        new CapabilityProviderRuntimeIntegration(
                            runtime
                        );

                    return this.toItem(
                        integration.evaluate(
                            lifecycleResult
                        )
                    );

                }

            );

    }

    public search(
        keyword: string
    ):
    readonly RuntimeMonitorItem[] {

        const value =
            keyword
                .trim()
                .toLowerCase();

        if (!value.length) {

            return this.load();

        }

        return this.load().filter(

            item =>

                item.capabilityId
                    .toLowerCase()
                    .includes(value)

                ||

                (item.providerId ?? "")
                    .toLowerCase()
                    .includes(value)

        );

    }

    private toItem(
        result:
            CapabilityProviderRuntimeResult
    ): RuntimeMonitorItem {

        switch (
            result.status
        ) {

            case "capability_unresolved":

                return {

                    capabilityId:
                        result.capabilityId,

                    status:
                        result.status

                };

            case "provider_not_found":

                return {

                    capabilityId:
                        result.capabilityId,

                    providerId:
                        result.providerId,

                    status:
                        result.status

                };

            case "lifecycle_ineligible":

                return {

                    capabilityId:
                        result.capabilityId,

                    providerId:
                        result.providerId,

                    status:
                        result.status

                };

            case "runtime_ineligible":

            case "runtime_eligible":

                return {

                    capabilityId:
                        result.capabilityId,

                    providerId:
                        result.providerId,

                    status:
                        result.status,

                    initialized:
                        result.runtime.initialized,

                    loaded:
                        result.runtime.loaded

                };

        }

    }

}

/**
 * =============================================================================
 * Default Runtime Monitor Adapter
 *
 * Repository Reality:
 * Phase-18 does not own provider runtime storage.
 * The runtime resolver contract explicitly allows returning undefined when no
 * authoritative runtime observation is available.
 * =============================================================================
 */

export const runtimeMonitorAdapter =
    new RuntimeMonitorAdapter({

        resolve(
            _providerId: string
        ): ProviderRuntime | undefined {

            return undefined;

        }

    });
