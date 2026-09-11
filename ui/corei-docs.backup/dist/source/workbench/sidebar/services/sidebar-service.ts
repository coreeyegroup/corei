/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-03
 *
 * Sidebar Service
 * ============================================================================
 */

import {

    sidebarRuntime

} from "../runtime/sidebar-runtime";

class SidebarService {

    open(): void {

        sidebarRuntime.open();

    }

    close(): void {

        sidebarRuntime.close();

    }

    toggle(): void {

        sidebarRuntime.toggle();

    }

    resize(

        width: number

    ): void {

        sidebarRuntime.resize(

            width

        );

    }

}

export const sidebarService =

new SidebarService();
