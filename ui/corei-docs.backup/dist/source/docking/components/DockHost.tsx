import type {
    PropsWithChildren
} from "react";


export function DockHost(

    props: PropsWithChildren

): React.JSX.Element {

    return (

        <section
            className="corei-dock-surface"
            data-corei-surface="dock"
        >

            {props.children}

        </section>

    );

}


export default DockHost;
