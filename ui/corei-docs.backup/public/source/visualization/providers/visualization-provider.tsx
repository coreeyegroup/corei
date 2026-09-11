import type {

    PropsWithChildren

} from "react";

export function VisualizationProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
