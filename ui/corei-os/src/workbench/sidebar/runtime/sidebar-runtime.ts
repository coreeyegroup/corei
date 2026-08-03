/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-03
 *
 * Sidebar Runtime
 * ============================================================================
 */

import { eventBus } from "../../events";

import {

    SidebarEvents

} from "../events/sidebar-events";

import {

    useSidebarState

} from "../state/sidebar-state";

class SidebarRuntime {

    initialize(): void {}

    dispose(): void {}

    open(): void {

        useSidebarState.setState({

            visible: true

        });

        eventBus.publish({

            type: SidebarEvents.OPENED,

            payload: {}

        });

    }

    close(): void {

        useSidebarState.setState({

            visible: false

        });

        eventBus.publish({

            type: SidebarEvents.CLOSED,

            payload: {}

        });

    }

    toggle(): void {

        const visible =

            useSidebarState.getState().visible;

        visible

            ? this.close()

            : this.open();

        eventBus.publish({

            type: SidebarEvents.TOGGLED,

            payload: {}

        });

    }

    resize(

        width: number

    ): void {

        useSidebarState.setState({

            width

        });

        eventBus.publish({

            type: SidebarEvents.RESIZED,

            payload: {

                width

            }

        });

    }

}

export const sidebarRuntime =

new SidebarRuntime();

