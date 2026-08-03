/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 * =============================================================================
 */

interface LifecycleMonitorSearchProps {

    readonly value: string;

    readonly onChange: (
        value: string
    ) => void;

}

export function LifecycleMonitorSearch({

    value,
    onChange

}: LifecycleMonitorSearchProps) {

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
