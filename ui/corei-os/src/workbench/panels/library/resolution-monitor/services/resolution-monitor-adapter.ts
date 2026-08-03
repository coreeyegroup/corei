/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 *
 * Repository Reality:
 * Read-only monitor over CapabilityProviderResolver.
 * =============================================================================
 */

import {
    CapabilityProviderBindingRegistry,
    CapabilityProviderResolver,
    type CapabilityProviderResolution
} from "@/capabilities/integration";

export interface ResolutionMonitorItem {

    readonly capabilityId: string;

    readonly status: "resolved" | "unresolved";

    readonly providerId?: string;

    readonly priority?: number;

    readonly enabled?: boolean;

}

export class ResolutionMonitorAdapter {

    private readonly registry =
        new CapabilityProviderBindingRegistry();

    private readonly resolver =
        new CapabilityProviderResolver(
            this.registry
        );

    public load():
    readonly ResolutionMonitorItem[] {

        return this.registry
            .getAll()
            .map(binding => binding.capabilityId)
            .filter(
                (value, index, self) =>
                    self.indexOf(value) === index
            )
            .map(
                capabilityId =>
                    this.toItem(
                        this.resolver.resolve(
                            capabilityId
                        )
                    )
            );

    }

    public search(
        keyword: string
    ):
    readonly ResolutionMonitorItem[] {

        const value =
            keyword.trim().toLowerCase();

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

        resolution:
            CapabilityProviderResolution

    ): ResolutionMonitorItem {

        if (
            resolution.status ===
            "resolved"
        ) {

            return {

                capabilityId:
                    resolution.capabilityId,

                status:
                    resolution.status,

                providerId:
                    resolution.providerId,

                priority:
                    resolution.binding.priority,

                enabled:
                    resolution.binding.enabled

            };

        }

        return {

            capabilityId:
                resolution.capabilityId,

            status:
                resolution.status

        };

    }

}

export const resolutionMonitorAdapter =
    new ResolutionMonitorAdapter();
