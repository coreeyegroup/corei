/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-012
 * File       : render-provider.tsx
 * Purpose    : Rendering Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function RenderProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
