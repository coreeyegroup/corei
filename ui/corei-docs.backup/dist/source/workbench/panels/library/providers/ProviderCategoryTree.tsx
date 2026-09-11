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
 * File        : ProviderCategoryTree.tsx
 *
 * Repository Reality
 * ------------------
 * The Provider Platform currently exposes no category metadata.
 * A single logical collection is therefore presented.
 * =============================================================================
 */

import type { ReactElement } from "react";

export interface ProviderCategoryTreeProps {

    readonly total: number;

}

export function ProviderCategoryTree({

    total,

}: ProviderCategoryTreeProps): ReactElement {

    return (

        <div className="border-b border-border p-3">

            <div className="text-xs uppercase tracking-wide text-muted-foreground">

                Registered Providers

            </div>

            <div className="mt-2 text-sm">

                {total} Provider{total === 1 ? "" : "s"}

            </div>

        </div>

    );

}
