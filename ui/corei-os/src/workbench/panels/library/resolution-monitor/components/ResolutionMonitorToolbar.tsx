/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 *
 * File        : ResolutionMonitorToolbar.tsx
 * =============================================================================
 */

interface ResolutionMonitorToolbarProps {

    readonly total: number;

}

export function ResolutionMonitorToolbar({

    total

}: ResolutionMonitorToolbarProps) {

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

                Resolution Monitor

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
