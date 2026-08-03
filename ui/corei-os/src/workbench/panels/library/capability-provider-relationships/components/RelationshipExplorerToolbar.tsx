/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 *
 * File        : RelationshipExplorerToolbar.tsx
 * =============================================================================
 */

interface RelationshipExplorerToolbarProps {

    readonly total: number;

}

export function RelationshipExplorerToolbar({

    total

}: RelationshipExplorerToolbarProps) {

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

                Capability ↔ Provider Relationships

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
