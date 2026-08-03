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
 * File        : ProviderList.tsx
 * =============================================================================
 */

import type { ReactElement } from "react";

import type {

    ProviderExplorerItem,

} from "./services/provider-explorer-adapter";

import {

    ProviderStatusBadge,

} from "./ProviderStatusBadge";

export interface ProviderListProps {

    readonly items: readonly ProviderExplorerItem[];

    readonly selectedId?: string;

    onSelect(

        provider: ProviderExplorerItem

    ): void;

}

export function ProviderList({

    items,
    selectedId,
    onSelect,

}: ProviderListProps): ReactElement {

    return (

        <div className="overflow-auto">

            {

                items.map(

                    provider => (

                        <button
                            key={provider.id}
                            type="button"
                            onClick={() => onSelect(provider)}
                            className={[
                                "flex w-full flex-col border-b border-border p-3 text-left hover:bg-accent",
                                selectedId === provider.id
                                    ? "bg-accent"
                                    : "",
                            ].join(" ")}
                        >

                            <div className="flex items-center justify-between">

                                <span className="font-medium">

                                    {provider.name}

                                </span>

                                <ProviderStatusBadge
                                    enabled={provider.enabled}
                                />

                            </div>

                            <div className="mt-1 text-xs text-muted-foreground">

                                {provider.vendor}

                            </div>

                        </button>

                    )

                )

            }

        </div>

    );

}
