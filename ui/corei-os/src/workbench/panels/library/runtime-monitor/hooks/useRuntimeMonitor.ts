/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 08
 *
 * File        : useRuntimeMonitor.ts
 * Purpose     : Runtime Monitor State
 * =============================================================================
 */

import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    runtimeMonitorAdapter,
    type RuntimeMonitorItem
} from "../services/runtime-monitor-adapter";

export interface RuntimeMonitorState {

    readonly search: string;

    readonly items:
        readonly RuntimeMonitorItem[];

    readonly selected?:
        RuntimeMonitorItem;

    setSearch(
        value: string
    ): void;

    select(
        item: RuntimeMonitorItem
    ): void;

}

export function useRuntimeMonitor():
RuntimeMonitorState {

    const [
        search,
        setSearch
    ] = useState("");

    const [
        selected,
        setSelected
    ] = useState<
        RuntimeMonitorItem
    >();

    const items =
        useMemo(

            () =>
                runtimeMonitorAdapter.search(
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

                return;

            }

            const exists =
                items.some(

                    (
                        item: RuntimeMonitorItem
                    ) =>

                        item.capabilityId ===
                            selected.capabilityId

                        &&

                        item.providerId ===
                            selected.providerId

                        &&

                        item.status ===
                            selected.status

                );

            if (!exists) {

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
