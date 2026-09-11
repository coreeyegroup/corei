import type { PropsWithChildren, ReactElement } from "react";

export interface DockContainerProps extends PropsWithChildren {
    className?: string;
}

export function DockContainer({
    className,
    children,
}: DockContainerProps): ReactElement {
    return (
        <div
            className={[
                "corei-dock-container",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </div>
    );
}

export default DockContainer;
