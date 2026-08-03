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
 * File        : ProviderExplorerPanel.tsx
 * =============================================================================
 */

import type { ReactElement } from "react";

import {

    ProviderCategoryTree,

} from "./ProviderCategoryTree";

import {

    ProviderDetails,

} from "./ProviderDetails";

import {

    ProviderEmptyState,

} from "./ProviderEmptyState";

import {

    ProviderExplorerToolbar,

} from "./ProviderExplorerToolbar";

import {

    ProviderList,

} from "./ProviderList";

import {

    ProviderSearch,

} from "./ProviderSearch";

import {

    useProviderExplorer,

} from "./hooks/useProviderExplorer";

export function ProviderExplorerPanel(): ReactElement {

    const {

        search,
        items,
        selected,
        setSearch,
        select,

    } = useProviderExplorer();

    return (

        <div className="flex h-full flex-col">

            <ProviderExplorerToolbar

                total={items.length}

            />

            <ProviderSearch

                value={search}

                onChange={setSearch}

            />

            {

                items.length === 0

                ? (

                    <ProviderEmptyState />

                )

                : (

                    <div className="flex min-h-0 flex-1">

                        <aside
                            className="
                                flex
                                min-w-[320px]
                                max-w-[420px]
                                basis-[340px]
                                flex-col
                                border-r
                                border-border
                            "
                        >

                            <ProviderCategoryTree

                                total={items.length}

                            />

                            <ProviderList

                                items={items}

                                selectedId={selected?.id}

                                onSelect={select}

                            />

                        </aside>

                        <main className="min-w-0 flex-1 overflow-auto">

                            <ProviderDetails

                                provider={selected}

                            />

                        </main>

                    </div>

                )

            }

        </div>

    );

}
