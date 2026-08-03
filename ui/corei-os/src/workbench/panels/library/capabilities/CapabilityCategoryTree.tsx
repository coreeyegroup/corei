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
 * File        : CapabilityCategoryTree.tsx
 *
 * Repository Reality
 * ------------------
 * Current Capability Platform exposes no category metadata.
 *
 * This component therefore represents the single institutional
 * capability collection until category support exists.
 * =============================================================================
 */

import type {

    ReactElement,

} from "react";

export function CapabilityCategoryTree():

ReactElement {

    return (

        <div
            className="
                border-b
                border-border
                px-4
                py-3
                text-sm
                font-medium
            "
        >

            Registered Capabilities

        </div>

    );

}