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
 * File        : CapabilityDetails.tsx
 * =============================================================================
 */

import type {
    ReactElement,
} from "react";

import type {

    CapabilityExplorerItem,

} from "./services/capability-explorer-adapter";

export interface CapabilityDetailsProps {

    capability?: CapabilityExplorerItem;

}

export function CapabilityDetails({

    capability,

}: CapabilityDetailsProps): ReactElement {

    if (!capability) {

        return (

            <div
                className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-muted-foreground
                "
            >

                Select a capability.

            </div>

        );

    }

    return (

        <div className="space-y-6 p-6">

            <div>

                <div
                    className="
                        text-xs
                        uppercase
                        text-muted-foreground
                    "
                >

                    Name

                </div>

                <div className="mt-1 font-medium">

                    {capability.name}

                </div>

            </div>

            <div>

                <div
                    className="
                        text-xs
                        uppercase
                        text-muted-foreground
                    "
                >

                    Identifier

                </div>

                <div className="mt-1">

                    {capability.id}

                </div>

            </div>

            <div>

                <div
                    className="
                        text-xs
                        uppercase
                        text-muted-foreground
                    "
                >

                    Version

                </div>

                <div className="mt-1">

                    {capability.version}

                </div>

            </div>

        </div>

    );

}
