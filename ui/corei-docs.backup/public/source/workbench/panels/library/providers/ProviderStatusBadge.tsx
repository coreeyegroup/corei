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
 * File        : ProviderStatusBadge.tsx
 *
 * Repository Reality
 * ------------------
 * Current Provider Platform exposes only:
 *
 * id
 * name
 * version
 * vendor
 * enabled
 * =============================================================================
 */

import type {
    ReactElement,
} from "react";

export interface ProviderStatusBadgeProps {

    enabled: boolean;

}

export function ProviderStatusBadge({

    enabled,

}: ProviderStatusBadgeProps): ReactElement {

    return (

        <span
            className="
                rounded
                border
                border-border
                px-2
                py-1
                text-xs
                font-medium
            "
        >

            {

                enabled

                    ? "Enabled"

                    : "Disabled"

            }

        </span>

    );

}
