import type {
    PropsWithChildren,
    HTMLAttributes
} from "react";

export interface SurfaceProps
    extends
        PropsWithChildren,
        HTMLAttributes<HTMLDivElement> {

    elevation?: "flat" | "low" | "medium" | "high";

    semantic?:
        | "workspace"
        | "application"
        | "panel"
        | "elevated";

}
