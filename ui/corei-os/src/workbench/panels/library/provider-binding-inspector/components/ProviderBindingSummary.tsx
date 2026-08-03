/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 18
 * Step        : 05
 * =============================================================================
 */

import type {

    ProviderBindingInspectorItem

} from "../services/provider-binding-inspector-adapter";

interface ProviderBindingSummaryProps {

    readonly items:
        readonly ProviderBindingInspectorItem[];

}

export function ProviderBindingSummary({

    items

}: ProviderBindingSummaryProps) {

    const enabled =
        items.filter(
            item => item.enabled
        ).length;

    const disabled =
        items.length - enabled;

    return (

        <div
            className="
                flex
                gap-6
                rounded-md
                border
                p-3
                text-sm
            "
        >

            <div>

                Bindings

                <strong className="ml-2">

                    {items.length}

                </strong>

            </div>

            <div>

                Enabled

                <strong className="ml-2">

                    {enabled}

                </strong>

            </div>

            <div>

                Disabled

                <strong className="ml-2">

                    {disabled}

                </strong>

            </div>

        </div>

    );

}
