/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 03
 *
 * Component   : Provider Explorer
 * File        : useProviderExplorer.ts
 * =============================================================================
 */

import {

    useEffect,
    useMemo,
    useState,

} from "react";

import {

    providerExplorerAdapter,
    type ProviderExplorerItem,

} from "../services/provider-explorer-adapter";

export interface ProviderExplorerState {

    readonly search: string;

    readonly items:
        readonly ProviderExplorerItem[];

    readonly selected?:
        ProviderExplorerItem;

    setSearch(
        value: string
    ): void;

    select(
        provider: ProviderExplorerItem
    ): void;

}

export function useProviderExplorer():
ProviderExplorerState {

    const [

        search,

        setSearch

    ] = useState("");

    const [

        selected,

        setSelected

    ] = useState<ProviderExplorerItem>();

    const items =
        useMemo(

            () =>

                providerExplorerAdapter.search(

                    search

                ),

            [

                search

            ]

        );

    useEffect(

        () => {

            if (!items.length) {

                setSelected(

                    undefined

                );

                return;

            }

            if (!selected) {

                setSelected(

                    items[0]

                );

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

        select: setSelected,

    };

}
