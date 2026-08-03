/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 *
 * File        : LifecycleMonitorToolbar.tsx
 * =============================================================================
 */

interface LifecycleMonitorToolbarProps {

    readonly total: number;

}

export function LifecycleMonitorToolbar({

    total

}: LifecycleMonitorToolbarProps) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                border-b
                px-4
                py-2
            "
        >

            <span className="font-medium">

                Lifecycle Monitor

            </span>

            <span
                className="
                    rounded
                    border
                    px-2
                    py-1
                    text-xs
                "
            >

                {total}

            </span>

        </div>

    );

}
