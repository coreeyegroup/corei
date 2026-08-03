import type {
    SurfaceProps
} from "./Surface.types";

import {
    themeEngine
} from "../../themes";

export function Surface({

    children,

    semantic = "panel",

    elevation = "flat",

    style,

    ...props

}: SurfaceProps) {

    const theme =
        themeEngine.getTheme();

    return (

        <div

            {...props}

            style={{

                background:
                    theme.surfaces[semantic],

                ...style

            }}

        >

            {children}

        </div>

    );

}
