/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-04
 *
 * FILE
 * tab-runtime.ts
 * ============================================================================
 */

import { eventBus } from "../../events";

import { TabEvents } from "../events/tab-events";

import { useTabState } from "../state/tab-state";

import type { WorkbenchTab } from "../contracts/tab-contract";

class TabRuntime {

    initialize(): void {}

    dispose(): void {}

    open(

        tab: WorkbenchTab

    ): void {

        const state = useTabState.getState();

        if (

            state.tabs.some(

                t => t.id === tab.id

            )

        ) {

            this.activate(tab.id);

            return;

        }

        useTabState.setState({

            tabs: [

                ...state.tabs,

                tab

            ],

            activeTab: tab.id

        });

        eventBus.publish({

            type: TabEvents.OPENED,

            payload: tab

        });

    }

    activate(

        id: string

    ): void {

        useTabState.setState({

            activeTab: id

        });

        eventBus.publish({

            type: TabEvents.ACTIVATED,

            payload: { id }

        });

    }

    close(

        id: string

    ): void {

        const state = useTabState.getState();

        const tabs = state.tabs.filter(

            tab => tab.id !== id

        );

        useTabState.setState({

            tabs,

            activeTab:

                tabs.length

                    ? tabs[tabs.length - 1].id

                    : null

        });

        eventBus.publish({

            type: TabEvents.CLOSED,

            payload: { id }

        });

    }

}

export const tabRuntime =

new TabRuntime();
