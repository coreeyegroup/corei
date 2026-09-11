/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-019
 * File       : trading-provider.tsx
 * Purpose    : Trading Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function TradingProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
