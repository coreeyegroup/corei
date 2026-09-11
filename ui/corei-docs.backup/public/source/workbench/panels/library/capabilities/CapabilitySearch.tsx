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
 * File        : CapabilitySearch.tsx
 *
 * Purpose
 * -------
 * Search input for the Capability Explorer.
 *
 * =============================================================================
 */

import type {
    ChangeEvent,
    ReactElement,
} from "react";

export interface CapabilitySearchProps {

    value: string;

    onChange(
        value: string
    ): void;

}

export function CapabilitySearch({

    value,
    onChange,

}: CapabilitySearchProps): ReactElement {

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {

        onChange(event.target.value);

    };

    return (

        <div className="border-b border-border p-3">

            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search capabilities..."
                className="
                    w-full
                    rounded-md
                    border
                    border-border
                    bg-background
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-primary
                "
            />

        </div>

    );

}
