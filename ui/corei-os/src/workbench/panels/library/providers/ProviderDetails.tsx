/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 *
 * Component   : Provider Explorer
 * File        : ProviderDetails.tsx
 * =============================================================================
 */

import type { ReactElement } from "react";

import type {

    ProviderExplorerItem,

} from "./services/provider-explorer-adapter";

import {

    ProviderStatusBadge,

} from "./ProviderStatusBadge";

export interface ProviderDetailsProps {

    readonly provider?: ProviderExplorerItem;

}

export function ProviderDetails({

    provider,

}: ProviderDetailsProps): ReactElement {

    if (!provider) {

        return (

            <div className="p-6 text-sm text-muted-foreground">

                Select a provider.

            </div>

        );

    }

    return (

        <div className="space-y-6 p-6">

            <div>

                <h2 className="text-lg font-semibold">

                    {provider.name}

                </h2>

            </div>

            <div className="grid gap-4">

                <div>

                    <div className="text-xs text-muted-foreground">

                        Identifier

                    </div>

                    <div>{provider.id}</div>

                </div>

                <div>

                    <div className="text-xs text-muted-foreground">

                        Vendor

                    </div>

                    <div>{provider.vendor}</div>

                </div>

                <div>

                    <div className="text-xs text-muted-foreground">

                        Version

                    </div>

                    <div>{provider.version}</div>

                </div>

                <div>

                    <div className="text-xs text-muted-foreground">

                        Status

                    </div>

                    <ProviderStatusBadge
                        enabled={provider.enabled}
                    />

                </div>

            </div>

        </div>

    );

}
