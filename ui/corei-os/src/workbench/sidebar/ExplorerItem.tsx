/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * Explorer Item
 *
 * Existing explorer selection/runtime is consumed unchanged.
 * ============================================================================
 */

import {
    explorerService
} from "./services";

import {
    useExplorerState
} from "./state";


interface ExplorerItemProps {

    id: string;

    label: string;

}


export function ExplorerItem(
    props: ExplorerItemProps
): React.JSX.Element {

    const selected =
        useExplorerState(
            state =>
                state.selected === props.id
        );


    return (

        <button
            type="button"
            className={
                selected
                    ? "corei-explorer-item selected"
                    : "corei-explorer-item"
            }
            aria-current={
                selected
                    ? "page"
                    : undefined
            }
            onClick={() =>
                explorerService.select(
                    props.id
                )
            }
        >

            <span
                className="corei-explorer-item-marker"
                aria-hidden="true"
            />

            <span
                className="corei-explorer-item-label"
            >
                {props.label}
            </span>

        </button>

    );
}


export default ExplorerItem;
