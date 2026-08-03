/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 *
 * File        : RelationshipExplorerPanel.tsx
 * =============================================================================
 */

import {

    useRelationshipExplorer

} from "../hooks/useRelationshipExplorer";

import {

    RelationshipSearch

} from "./RelationshipSearch";

import {

    RelationshipExplorerToolbar

} from "./RelationshipExplorerToolbar";

import {

    RelationshipSummary

} from "./RelationshipSummary";

import {

    RelationshipList

} from "./RelationshipList";

import {

    RelationshipDetails

} from "./RelationshipDetails";

import {

    RelationshipEmptyState

} from "./RelationshipEmptyState";

export function RelationshipExplorerPanel() {

    const explorer =
        useRelationshipExplorer();

    return (

        <div
            className="
                flex
                h-full
                flex-col
            "
        >

            <RelationshipExplorerToolbar
                total={explorer.items.length}
            />

            <div className="p-3">

                <RelationshipSearch
                    value={explorer.search}
                    onChange={explorer.setSearch}
                />

            </div>

            <div className="px-3 pb-3">

                <RelationshipSummary
                    items={explorer.items}
                />

            </div>

            {

                explorer.items.length === 0

                ? (

                    <RelationshipEmptyState />

                )

                : (

                    <div
                        className="
                            grid
                            h-full
                            grid-cols-2
                            gap-3
                            overflow-hidden
                            px-3
                            pb-3
                        "
                    >

                        <RelationshipList
                            items={explorer.items}
                            selected={explorer.selected}
                            onSelect={explorer.select}
                        />

                        <RelationshipDetails
                            relationship={
                                explorer.selected
                            }
                        />

                    </div>

                )

            }

        </div>

    );

}
