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

interface ProviderBindingDetailsProps {

    readonly binding?:
        ProviderBindingInspectorItem;

}

export function ProviderBindingDetails({

    binding

}: ProviderBindingDetailsProps) {

    if (!binding) {

        return null;

    }

    return (

        <div
            className="
                space-y-4
                rounded-md
                border
                p-4
            "
        >

            <div>

                <strong>Capability</strong>

                <div>

                    {binding.capabilityId}

                </div>

            </div>

            <div>

                <strong>Provider</strong>

                <div>

                    {binding.providerId}

                </div>

            </div>

            <div>

                <strong>Priority</strong>

                <div>

                    {binding.priority}

                </div>

            </div>

            <div>

                <strong>Binding Enabled</strong>

                <div>

                    {

                        binding.enabled
                            ? "Yes"
                            : "No"

                    }

                </div>

            </div>

            <div>

                <strong>Selection Reason</strong>

                <div className="text-sm text-muted-foreground">

                    Provider selection is determined by the
                    registered binding priority together with
                    the enabled flag. Additional lifecycle,
                    runtime, policy and fallback metadata are
                    not available in the current repository.

                </div>

            </div>

        </div>

    );

}
