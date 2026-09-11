/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 * =============================================================================
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 02
 *
 * Component   : Capability Explorer
 * File        : CapabilityList.tsx
 * =============================================================================
 */

import type { ReactElement } from "react";

import type {
    CapabilityExplorerItem,
} from "./services/capability-explorer-adapter";

import {
    CapabilityStatusBadge,
} from "./CapabilityStatusBadge";

export interface CapabilityListProps {

    readonly items: readonly CapabilityExplorerItem[];

    readonly selected?: CapabilityExplorerItem;

    select(
        capability: CapabilityExplorerItem
    ): void;

}

export function CapabilityList({

    items,
    selected,
    select,

}: CapabilityListProps): ReactElement {

    return (

        <div className="flex flex-col">

            {

                items.map(capability => {

                    const active =
                        capability.id === selected?.id;

                    return (

                        <button

                            key={capability.id}

                            type="button"

                            onClick={() => select(capability)}

                            className={`
                                flex
                                w-full
                                flex-col
                                gap-2
                                border-b
                                border-border
                                px-4
                                py-3
                                text-left
                                transition-colors
                                ${
                                    active
                                        ? "bg-accent"
                                        : "hover:bg-muted"
                                }
                            `}

                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span
                                    className="
                                        font-medium
                                    "
                                >

                                    {capability.name}

                                </span>

                                <CapabilityStatusBadge

                                    version={
                                        capability.version
                                    }

                                />

                            </div>

                            <span
                                className="
                                    text-xs
                                    text-muted-foreground
                                "
                            >

                                {capability.id}

                            </span>

                        </button>

                    );

                })

            }

        </div>

    );

}
