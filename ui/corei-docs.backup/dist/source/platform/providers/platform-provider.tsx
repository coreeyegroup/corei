/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-016
 * File       : platform-provider.tsx
 * Purpose    : Platform Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function PlatformProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
