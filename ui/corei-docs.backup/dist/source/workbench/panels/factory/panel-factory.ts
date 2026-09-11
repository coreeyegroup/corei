/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-21
 *
 * FILE
 * panel-factory.ts
 *
 * PURPOSE
 * Authoritative Panel Factory
 * ============================================================================
 */

import type {

    PanelDescriptor

} from "../metadata";

class PanelFactory {

    create(

        definition: PanelDescriptor

    ): PanelDescriptor {

        return {

            ...definition

        };

    }

}

export const panelFactory =

new PanelFactory();
