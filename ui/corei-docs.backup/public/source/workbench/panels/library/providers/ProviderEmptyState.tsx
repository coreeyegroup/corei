/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 * =============================================================================
 */

import type {
    ReactElement,
} from "react";

export interface ProviderEmptyStateProps {

    message?: string;

}

export function ProviderEmptyState({

    message = "No providers available.",

}: ProviderEmptyStateProps): ReactElement {

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
