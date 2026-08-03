/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 */

interface ProviderBindingStatusBadgeProps {

    readonly enabled: boolean;

}

export function ProviderBindingStatusBadge({

    enabled

}: ProviderBindingStatusBadgeProps) {

    return (

        <span
            className="
                rounded
                border
                px-2
                py-1
                text-xs
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
