import type {

    PropsWithChildren

} from "react";

export function ExtensionProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
