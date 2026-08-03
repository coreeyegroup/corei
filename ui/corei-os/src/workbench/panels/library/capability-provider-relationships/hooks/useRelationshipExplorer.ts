/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 04
 *
 * Component   : Capability Provider Relationship Explorer
 * File        : useRelationshipExplorer.ts
 * =============================================================================
 */

import {

    useEffect,
    useMemo,
    useState

} from "react";

import {

    relationshipExplorerAdapter,
    type RelationshipExplorerItem

} from "../services/relationship-explorer-adapter";

export interface RelationshipExplorerState {

    readonly search: string;

    readonly items:
        readonly RelationshipExplorerItem[];

    readonly selected?:
        RelationshipExplorerItem;

    setSearch(
        value: string
    ): void;

    select(
        item: RelationshipExplorerItem
    ): void;

}

export function useRelationshipExplorer():
RelationshipExplorerState {

    const [

        search,
        setSearch

    ] = useState("");

    const [

        selected,
        setSelected

    ] = useState<RelationshipExplorerItem>();

    const items =
        useMemo(

            () =>

                relationshipExplorerAdapter.search(
                    search
                ),

            [

                search

            ]

        );

    useEffect(

        () => {

            if (!items.length) {

                setSelected(undefined);

                return;

            }

            if (!selected) {

                setSelected(items[0]);

            }

        },

        [

            items,
            selected

        ]

    );

    return {

        search,

        items,

        selected,

        setSearch,

        select: setSelected

    };

}
