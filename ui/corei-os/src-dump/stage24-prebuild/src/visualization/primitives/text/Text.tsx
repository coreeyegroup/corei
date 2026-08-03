import type {
    CSSProperties
} from "react";

import type {
    TextProps
} from "./Text.types";

import {
    themeEngine
} from "../../themes";

import {
    FontFamilies,
    FontSizes,
    FontWeights
} from "../../tokens";

export function Text({

    children,

    semantic = "primary",

    hierarchy = "secondary",

    style,

    ...props

}: TextProps) {

    const theme =
        themeEngine.getTheme();

    const typography: CSSProperties = {

        fontFamily: FontFamilies.sans,

        fontSize: FontSizes.md,

        fontWeight:
            hierarchy === "primary"
                ? FontWeights.semibold
                : FontWeights.regular,

        color:
            theme.text[semantic]

    };

    return (

        <span

            {...props}

            style={{

                ...typography,

                ...style

            }}

        >

            {children}

        </span>

    );

}
