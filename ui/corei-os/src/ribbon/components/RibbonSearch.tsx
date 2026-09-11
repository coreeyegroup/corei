/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * TOP RIBBON
 *
 * Global Search / Find Entry
 *
 * Presentation boundary only.
 * Search execution remains owned by the existing search infrastructure.
 *
 ******************************************************************************/

import type {
    ReactElement,
    ChangeEvent
} from "react";

export function RibbonSearch(): ReactElement {

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        /*
         * Presentation-only entry point.
         *
         * Search execution is intentionally not implemented here.
         * The Ribbon must not become the owner of global search.
         */
        void event;
    };

    return (
        <div
            className="corei-ribbon-search"
            data-ribbon-block="search"
            role="search"
        >
            <span
                className="corei-ribbon-search-icon"
                aria-hidden="true"
            >
                ⌕
            </span>

            <input
                type="search"
                className="corei-ribbon-search-input"
                aria-label="Find across COREI OS"
                placeholder="Find"
                onChange={handleChange}
            />

            <span
                className="corei-ribbon-search-key"
                aria-hidden="true"
            >
                ⌘K
            </span>
        </div>
    );
}

export default RibbonSearch;
