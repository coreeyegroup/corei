/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 */

import type {

    RelationshipExplorerItem

} from "../services/relationship-explorer-adapter";

interface RelationshipSummaryProps {

    readonly items:
        readonly RelationshipExplorerItem[];

}

export function RelationshipSummary({

    items

}: RelationshipSummaryProps) {

    const enabled =
        items.filter(
            item => item.enabled
        ).length;

    const disabled =
        items.length - enabled;

    return (

        <div
            className="
                flex
                gap-6
                rounded-md
                border
                p-3
                text-sm
            "
        >

            <div>

                Relationships

                <strong className="ml-2">

                    {items.length}

                </strong>

            </div>

            <div>

                Enabled

                <strong className="ml-2">

                    {enabled}

                </strong>

            </div>

            <div>

                Disabled

                <strong className="ml-2">

                    {disabled}

                </strong>

            </div>

        </div>

    );

}
