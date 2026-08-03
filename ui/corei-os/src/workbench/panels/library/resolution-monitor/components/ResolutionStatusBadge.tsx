/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 */

interface ResolutionStatusBadgeProps {

    readonly status:
        "resolved"
        | "unresolved";

}

export function ResolutionStatusBadge({

    status

}: ResolutionStatusBadgeProps) {

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

                status === "resolved"

                    ? "Resolved"

                    : "Unresolved"

            }

        </span>

    );

}
