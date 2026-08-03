import type { PropsWithChildren } from "react";

export function WorkspaceRoot(
    props: PropsWithChildren
): React.JSX.Element {

    return (

        <section
            className="flex h-full w-full overflow-hidden bg-neutral-950"
        >
            {props.children}
        </section>

    );

}
