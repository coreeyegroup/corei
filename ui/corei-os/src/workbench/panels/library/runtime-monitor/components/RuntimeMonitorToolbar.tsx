/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 * =============================================================================
 */

interface RuntimeMonitorToolbarProps {

    readonly total: number;

}

export function RuntimeMonitorToolbar({

    total

}: RuntimeMonitorToolbarProps) {

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

                Runtime Monitor

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
