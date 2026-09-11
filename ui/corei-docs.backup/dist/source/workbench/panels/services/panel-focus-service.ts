/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-05
 *
 * FILE
 * panel-focus-service.ts
 * ============================================================================
 */

import {

    panelFocusRuntime

} from "../runtime/panel-focus-runtime";

class PanelFocusService {

    focus(

        panelId: string

    ): void {

        panelFocusRuntime.focus(

            panelId

        );

    }

    blur(): void {

        panelFocusRuntime.blur();

    }

}

export const panelFocusService =

new PanelFocusService();
