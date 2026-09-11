/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 *
 * Component   : Capability Explorer
 * File        : CapabilityExplorerToolbar.tsx
 * =============================================================================
 */

import type { ReactElement } from "react";

export interface CapabilityExplorerToolbarProps {

    readonly total: number;

}

export function CapabilityExplorerToolbar({

    total,

}: CapabilityExplorerToolbarProps): ReactElement {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                border-b
                border-border
                px-4
                py-2
            "
        >

            <span
                className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-muted-foreground
                "
            >

                Capability Explorer

            </span>

            <span
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

            </span>

        </div>

    );

}
