/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 * =============================================================================
 */

interface RelationshipSearchProps {

    readonly value: string;

    readonly onChange: (
        value: string
    ) => void;

}

export function RelationshipSearch({

    value,
    onChange

}: RelationshipSearchProps) {

    return (

        <input
            type="text"
            value={value}
            placeholder="Search capability or provider..."
            onChange={
                event =>
                    onChange(
                        event.target.value
                    )
            }
            className="
                w-full
                rounded-md
                border
                border-border
                bg-background
                px-3
                py-2
                text-sm
                outline-none
            "
        />

    );

}
