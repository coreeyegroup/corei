import {
    createContext,
    useMemo,
    useState,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction
} from "react";

import {
    initialRibbonState,
    type RibbonState
} from "../state";

export interface RibbonContextValue {

    state: RibbonState;

    setState: Dispatch<SetStateAction<RibbonState>>;

}

export const RibbonContext =
    createContext<RibbonContextValue | null>(null);

export function RibbonProvider(
    props: PropsWithChildren
) {

    const [state, setState] =
        useState<RibbonState>(
            initialRibbonState
        );

    const value =
        useMemo(
            () => ({
                state,
                setState
            }),
            [state]
        );

    return (

        <RibbonContext.Provider value={value}>

            {props.children}

        </RibbonContext.Provider>

    );

}
