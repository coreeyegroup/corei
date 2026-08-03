/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE
 * explorer-service.ts
 *
 * PURPOSE
 * Explorer Service
 * ============================================================================
 */

import { explorerRuntime } from "../runtime/explorer-runtime";

class ExplorerService {

    select(

        id: string

    ): void {

        explorerRuntime.select(

            id

        );

    }

    toggle(

        id: string

    ): void {

        explorerRuntime.toggle(

            id

        );

    }

}

export const explorerService =

    new ExplorerService();

