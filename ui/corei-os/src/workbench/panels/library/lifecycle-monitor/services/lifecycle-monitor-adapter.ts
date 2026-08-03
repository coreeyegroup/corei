/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 *
 * Repository Reality:
 * Read-only monitor over CapabilityProviderLifecycleIntegration.
 * =============================================================================
 */

import {
    CapabilityProviderBindingRegistry,
    CapabilityProviderResolver,
    CapabilityProviderLifecycleIntegration,
    type CapabilityProviderLifecycleResult
} from "@/capabilities/integration";

import {
    UIProviderManager,
    DefaultUIProviderLifecycle
} from "@/providers";

export interface LifecycleMonitorItem {

    readonly capabilityId: string;

    readonly status:
        | "capability_unresolved"
        | "provider_not_found"
        | "lifecycle_ineligible"
        | "lifecycle_eligible";

    readonly providerId?: string;

    readonly lifecycleState?: string;

}

export class LifecycleMonitorAdapter {

    private readonly bindingRegistry =
        new CapabilityProviderBindingRegistry();

    private readonly resolver =
        new CapabilityProviderResolver(
            this.bindingRegistry
        );

    private readonly integration =
        new CapabilityProviderLifecycleIntegration(
            new UIProviderManager(),
            DefaultUIProviderLifecycle
        );

    public load():
    readonly LifecycleMonitorItem[] {

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
                capabilityId =>
                    this.toItem(
                        this.integration.evaluate(
                            this.resolver.resolve(
                                capabilityId
                            )
                        )
                    )
            );

    }

    public search(
        keyword: string
    ):
    readonly LifecycleMonitorItem[] {

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
            CapabilityProviderLifecycleResult

    ): LifecycleMonitorItem {

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

                    status:
                        result.status,

                    providerId:
                        result.providerId

                };

            case "lifecycle_ineligible":

            case "lifecycle_eligible":

                return {

                    capabilityId:
                        result.capabilityId,

                    status:
                        result.status,

                    providerId:
                        result.providerId,

                    lifecycleState:
                        result.lifecycle.state

                };

        }

    }

}

export const lifecycleMonitorAdapter =
    new LifecycleMonitorAdapter();
