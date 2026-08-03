/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 07
 *
 * File        : useLifecycleMonitor.ts
 * Purpose     : Lifecycle Monitor State
 * =============================================================================
 */

import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    lifecycleMonitorAdapter,
    type LifecycleMonitorItem
} from "../services/lifecycle-monitor-adapter";

export interface LifecycleMonitorState {

    readonly search: string;

    readonly items:
        readonly LifecycleMonitorItem[];

    readonly selected?:
        LifecycleMonitorItem;

    setSearch(
        value: string
    ): void;

    select(
        item: LifecycleMonitorItem
    ): void;

}

export function useLifecycleMonitor():
LifecycleMonitorState {

    const [
        search,
        setSearch
    ] = useState("");

    const [
        selected,
        setSelected
    ] =
    useState<
        LifecycleMonitorItem
    >();

    const items =
        useMemo(

            () =>
                lifecycleMonitorAdapter.search(
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

            if (
                !selected
            ) {

                setSelected(
                    items[0]
                );

                return;

            }

            const exists =
                items.some(

                    (
                        item: LifecycleMonitorItem
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

            if (
                !exists
            ) {

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
