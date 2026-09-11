/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-002
 * File       : AppProvider.tsx
 * Purpose    : Institutional Provider Composition
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

import {

    ThemeProvider

} from "../foundation/theme/provider";

import {

    RuntimeProvider

} from "../runtime";

import {

    PlatformProvider

} from "../platform/providers/platform-provider";

import {

    SDKProvider

} from "../sdk/providers/sdk-provider";

export function AppProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return (

        <ThemeProvider>

            <RuntimeProvider>

                <PlatformProvider>

                    <SDKProvider>

                        {props.children}

                    </SDKProvider>

                </PlatformProvider>

            </RuntimeProvider>

        </ThemeProvider>

    );

}
