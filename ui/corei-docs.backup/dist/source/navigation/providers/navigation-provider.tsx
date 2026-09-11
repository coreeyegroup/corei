/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-010
 * File       : navigation-provider.tsx
 * Purpose    : Navigation Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function NavigationProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
