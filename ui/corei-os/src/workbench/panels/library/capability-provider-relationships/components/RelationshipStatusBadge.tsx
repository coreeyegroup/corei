/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 */

interface RelationshipStatusBadgeProps {

    readonly enabled: boolean;

}

export function RelationshipStatusBadge({

    enabled

}: RelationshipStatusBadgeProps) {

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
