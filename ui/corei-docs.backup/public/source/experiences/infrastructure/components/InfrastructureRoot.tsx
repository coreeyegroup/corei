/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-018
 * File       : InfrastructureRoot.tsx
 * Purpose    : Infrastructure Terminal Root
 * =============================================================================
 */

import {

    InfrastructureProvider

} from "../providers/infrastructure-provider";

export function InfrastructureRoot(): React.JSX.Element {

    return (

        <InfrastructureProvider>

            INFRASTRUCTURE TERMINAL

        </InfrastructureProvider>

    );

}
