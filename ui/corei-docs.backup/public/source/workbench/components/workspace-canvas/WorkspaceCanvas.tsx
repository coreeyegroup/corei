import type { PropsWithChildren } from "react";

export function WorkspaceCanvas(
    props: PropsWithChildren
): React.JSX.Element {

    return (

        <main
            className="
                flex
                h-full
                w-full
                flex-1
                overflow-hidden
                bg-neutral-950
            "
        >
            {props.children}
        </main>

    );

}
