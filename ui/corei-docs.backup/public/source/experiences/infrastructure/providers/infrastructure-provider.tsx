/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-018
 * File       : infrastructure-provider.tsx
 * Purpose    : Infrastructure Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function InfrastructureProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
