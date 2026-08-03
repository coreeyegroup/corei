/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 *
 * File        : ProviderBindingInspectorToolbar.tsx
 * =============================================================================
 */

interface ProviderBindingInspectorToolbarProps {

    readonly total: number;

}

export function ProviderBindingInspectorToolbar({

    total

}: ProviderBindingInspectorToolbarProps) {

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

                Provider Binding Inspector

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
