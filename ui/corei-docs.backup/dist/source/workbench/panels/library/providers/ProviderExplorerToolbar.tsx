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
 * File        : ProviderExplorerToolbar.tsx
 * =============================================================================
 */

import type { ReactElement } from "react";

export interface ProviderExplorerToolbarProps {

    readonly total: number;

}

export function ProviderExplorerToolbar({

    total,

}: ProviderExplorerToolbarProps): ReactElement {

    return (

        <header
            className="
                flex
                items-center
                justify-between
                border-b
                border-border
                px-4
                py-3
            "
        >

            <div>

                <h2 className="text-sm font-semibold">

                    Provider Explorer

                </h2>

                <p className="text-xs text-muted-foreground">

                    Registered Providers

                </p>

            </div>

            <div
                className="
                    rounded-md
                    border
                    border-border
                    px-2
                    py-1
                    text-xs
                "
            >

                {total}

            </div>

        </header>

    );

}
