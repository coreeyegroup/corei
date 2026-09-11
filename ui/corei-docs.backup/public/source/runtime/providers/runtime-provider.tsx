import type {

    PropsWithChildren

} from "react";

export function RuntimeProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
