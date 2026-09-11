/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE
 * explorer-runtime.ts
 *
 * PURPOSE
 * Explorer Runtime
 * ============================================================================
 */

import { eventBus } from "../../events";

import {

    useExplorerState

} from "../state/explorer-state";

import {

    ExplorerEvents

} from "../events/explorer-events";

class ExplorerRuntime {

    initialize(): void {

        //

    }

    dispose(): void {

        //

    }

    select(

        id: string

    ): void {

        useExplorerState.setState({

            selected: id

        });

        eventBus.publish({

            type: ExplorerEvents.SELECTED,

            payload: {

                id

            }

        });

    }

    toggle(

        id: string

    ): void {

        const {

            expanded

        } = useExplorerState.getState();

        const next = new Set(expanded);

        if (

            next.has(id)

        ) {

            next.delete(id);

        }

        else {

            next.add(id);

        }

        useExplorerState.setState({

            expanded: next

        });

        eventBus.publish({

            type: ExplorerEvents.TOGGLED,

            payload: {

                id

            }

        });

    }

}

export const explorerRuntime =

    new ExplorerRuntime();
