interface RuntimeStatusBadgeProps {

    readonly status:
        | "capability_unresolved"
        | "provider_not_found"
        | "lifecycle_ineligible"
        | "runtime_ineligible"
        | "runtime_eligible";

}

export function RuntimeStatusBadge({

    status

}: RuntimeStatusBadgeProps) {

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
