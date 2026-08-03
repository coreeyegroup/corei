/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-19
 * Step-09
 * Build Unit : BU-003
 * File       : window-provider.tsx
 * Purpose    : Institutional Window Provider
 * =============================================================================
 */

import {

    PropsWithChildren,
    useEffect

} from "react";

import {

    windowLifecycle

} from "../lifecycle/window-lifecycle";

import {

    multiWindowRecovery

} from "../recovery/multi-window-recovery";

import {

    useWindowState

} from "../state/window-state";

export function WindowProvider(

    props: PropsWithChildren

): React.JSX.Element {

    const synchronize =

        useWindowState(

            state => state.synchronize

        );

    useEffect(() => {

        windowLifecycle.initialize();

        multiWindowRecovery.startup();

        synchronize();

        return () => {

            multiWindowRecovery.shutdown();

        };

    }, [

        synchronize

    ]);

    return <>

        {props.children}

    </>;

}
