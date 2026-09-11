/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-019
 * File       : TradingRoot.tsx
 * Purpose    : Trading Terminal Root
 * =============================================================================
 */

import {

    TradingProvider

} from "../providers/trading-provider";

export function TradingRoot(): React.JSX.Element {

    return (

        <TradingProvider>

            TRADING TERMINAL

        </TradingProvider>

    );

}
