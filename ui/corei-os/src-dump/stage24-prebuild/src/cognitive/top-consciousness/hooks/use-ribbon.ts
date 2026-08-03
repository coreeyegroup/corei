import { useContext } from "react";

import { RibbonContext } from "../providers";

export function useRibbon() {

    const context =
        useContext(RibbonContext);

    if (!context) {

        throw new Error(
            "useRibbon must be used inside RibbonProvider."
        );

    }

    return context;

}

