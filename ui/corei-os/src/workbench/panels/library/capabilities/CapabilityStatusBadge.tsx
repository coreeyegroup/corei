/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 *
 * NOTE
 * ----
 * Current Capability Platform exposes only:
 *
 *  id
 *  name
 *  version
 *
 * Runtime status is intentionally unavailable.
 * =============================================================================
 */

import type { ReactElement } from "react";

export interface CapabilityStatusBadgeProps {

    version: string;

}

export function CapabilityStatusBadge({

    version,

}: CapabilityStatusBadgeProps): ReactElement {

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

            v{version}

        </span>

    );

}
