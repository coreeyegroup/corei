/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 * =============================================================================
 */

import type { ReactElement } from "react";

export interface CapabilityEmptyStateProps {

    message?: string;

}

export function CapabilityEmptyState({

    message = "No capabilities available.",

}: CapabilityEmptyStateProps): ReactElement {

    return (

        <div
            className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                text-muted-foreground
            "
        >

            {message}

        </div>

    );

}
