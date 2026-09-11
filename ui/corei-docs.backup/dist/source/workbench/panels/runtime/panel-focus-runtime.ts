/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-05
 *
 * FILE
 * panel-focus-runtime.ts
 * ============================================================================
 */

import { eventBus } from "../../events";

import {

    PanelFocusEvents

} from "../events/panel-focus-events";

import {

    usePanelFocusState

} from "../state/panel-focus-state";

class PanelFocusRuntime {

    initialize(): void {}

    dispose(): void {}

    focus(

        panelId: string

    ): void {

        usePanelFocusState

            .getState()

            .setFocusedPanel(

                panelId

            );

        eventBus.publish({

            type:

                PanelFocusEvents.FOCUSED,

            payload: {

                panelId

            }

        });

    }

    blur(): void {

        usePanelFocusState

            .getState()

            .setFocusedPanel(

                null

            );

        eventBus.publish({

            type:

                PanelFocusEvents.BLURRED,

            payload: {}

        });

    }

}

export const panelFocusRuntime =

new PanelFocusRuntime();
