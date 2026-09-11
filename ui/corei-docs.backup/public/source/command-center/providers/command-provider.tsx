/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-011
 * File       : command-provider.tsx
 * Purpose    : Command Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function CommandProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
