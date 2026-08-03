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
 * File        : ProviderSearch.tsx
 * =============================================================================
 */

import type {
    ChangeEvent,
    ReactElement,
} from "react";

export interface ProviderSearchProps {

    value: string;

    onChange(
        value: string
    ): void;

}

export function ProviderSearch({

    value,
    onChange,

}: ProviderSearchProps): ReactElement {

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
                placeholder="Search providers..."
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
