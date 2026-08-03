/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * =============================================================================
 */

import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    providerBindingInspectorAdapter,
    type ProviderBindingInspectorItem
} from "../services/provider-binding-inspector-adapter";

export interface ProviderBindingInspectorState {

    readonly search: string;

    readonly items:
        readonly ProviderBindingInspectorItem[];

    readonly selected?:
        ProviderBindingInspectorItem;

    setSearch(
        value: string
    ): void;

    select(
        item: ProviderBindingInspectorItem
    ): void;

}

export function useProviderBindingInspector():
ProviderBindingInspectorState {

    const [
        search,
        setSearch
    ] = useState("");

    const [
        selected,
        setSelected
    ] =
    useState<
        ProviderBindingInspectorItem
    >();

    const items =
        useMemo(

            () =>
                providerBindingInspectorAdapter.search(
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

        select: setSelected

    };

}
