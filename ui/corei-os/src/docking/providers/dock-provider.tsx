/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-008
 * File       : dock-provider.tsx
 * Purpose    : Dock Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function DockProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
