/*
------------------------------------------------------------
COREI
Stage 25
Phase 19
Step 07.06

Component:
WindowRoot

Purpose:
Institutional Window Composition Root
------------------------------------------------------------
*/

import { PropsWithChildren } from "react";

import { WindowContainer } from "./WindowContainer";
import { WindowSurface } from "./WindowSurface";
import { WindowFrame } from "./WindowFrame";
import { WindowClientArea } from "./WindowClientArea";
import { WindowContent } from "./WindowContent";

export interface WindowRootProps extends PropsWithChildren {}

export function WindowRoot({

    children,

}: WindowRootProps): React.JSX.Element {

    return (

        <WindowContainer>

            <WindowSurface>

                <WindowFrame>

                    <WindowClientArea>

                        <WindowContent>

                            {children}

                        </WindowContent>

                    </WindowClientArea>

                </WindowFrame>

            </WindowSurface>

        </WindowContainer>

    );

}

export default WindowRoot;
