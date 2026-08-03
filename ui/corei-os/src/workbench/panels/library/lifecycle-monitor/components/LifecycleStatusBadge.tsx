/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 */

interface LifecycleStatusBadgeProps {

    readonly status:
        | "capability_unresolved"
        | "provider_not_found"
        | "lifecycle_ineligible"
        | "lifecycle_eligible";

}

export function LifecycleStatusBadge({

    status

}: LifecycleStatusBadgeProps) {

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

            {status}

        </span>

    );

}
