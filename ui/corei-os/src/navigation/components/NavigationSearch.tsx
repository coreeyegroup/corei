/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-17
 *
 * FILE:
 * NavigationSearch.tsx
 *
 * PURPOSE:
 * Institutional Navigation Filter Control
 *
 * OWNERSHIP:
 * Navigation Domain
 *
 ******************************************************************************/

import type {
    ChangeEvent,
    ReactElement
} from "react";

export interface NavigationSearchProps {

    readonly value: string;

    readonly placeholder: string;

    readonly onChange: (value: string) => void;

}

export function NavigationSearch({
    value,
    placeholder,
    onChange
}: NavigationSearchProps): ReactElement {

    function handleChange(
        event: ChangeEvent<HTMLInputElement>
    ): void {

        onChange(event.target.value);

    }

    return (

        <label
            className="corei-navigation-search"
            data-navigation-element="search"
        >

            <span
                className="corei-navigation-search__icon"
                aria-hidden="true"
            >
                ⌕
            </span>

            <input
                className="corei-navigation-search__input"
                type="search"
                value={value}
                placeholder={placeholder}
                aria-label={placeholder}
                autoComplete="off"
                spellCheck={false}
                onChange={handleChange}
            />

            <kbd
                className="corei-navigation-search__hint"
                aria-hidden="true"
            >
                /
            </kbd>

        </label>

    );

}

export default NavigationSearch;
