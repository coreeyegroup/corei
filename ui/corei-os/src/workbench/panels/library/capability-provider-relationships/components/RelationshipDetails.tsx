/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 */

import type {

    RelationshipExplorerItem

} from "../services/relationship-explorer-adapter";

interface RelationshipDetailsProps {

    readonly relationship?:
        RelationshipExplorerItem;

}

export function RelationshipDetails({

    relationship

}: RelationshipDetailsProps) {

    if (!relationship) {

        return null;

    }

    return (

        <div
            className="
                space-y-3
                rounded-md
                border
                p-4
            "
        >

            <div>

                <strong>Capability</strong>

                <div>

                    {relationship.capabilityId}

                </div>

            </div>

            <div>

                <strong>Provider</strong>

                <div>

                    {relationship.providerId}

                </div>

            </div>

            <div>

                <strong>Priority</strong>

                <div>

                    {relationship.priority}

                </div>

            </div>

            <div>

                <strong>Status</strong>

                <div>

                    {

                        relationship.enabled
                            ? "Enabled"
                            : "Disabled"

                    }

                </div>

            </div>

        </div>

    );

}
