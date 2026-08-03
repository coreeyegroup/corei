/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 06
 *
 * File        : useResolutionMonitor.ts
 * Purpose     : Resolution Monitor State
 * =============================================================================
 */

import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    resolutionMonitorAdapter,
    type ResolutionMonitorItem
} from "../services/resolution-monitor-adapter";

export interface ResolutionMonitorState {

    readonly search: string;

    readonly items:
        readonly ResolutionMonitorItem[];

    readonly selected?:
        ResolutionMonitorItem;

    setSearch(
        value: string
    ): void;

    select(
        item: ResolutionMonitorItem
    ): void;

}

export function useResolutionMonitor():
ResolutionMonitorState {

    const [
        search,
        setSearch
    ] = useState("");

    const [
        selected,
        setSelected
    ] =
    useState<
        ResolutionMonitorItem
    >();

    const items =
        useMemo(

            () =>
                resolutionMonitorAdapter.search(
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

                    item =>

                        item.capabilityId ===
                            selected.capabilityId

                        &&

                        item.providerId ===
                            selected.providerId

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
