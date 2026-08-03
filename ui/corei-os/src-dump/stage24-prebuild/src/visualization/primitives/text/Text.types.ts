import type {
    HTMLAttributes,
    PropsWithChildren
} from "react";

export interface TextProps
    extends
        HTMLAttributes<HTMLSpanElement>,
        PropsWithChildren {

    semantic?:
        | "primary"
        | "secondary"
        | "muted";

    hierarchy?:
        | "primary"
        | "secondary"
        | "tertiary"
        | "supporting"
        | "background";

}
