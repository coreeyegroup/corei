import type {

    PropsWithChildren

} from "react";

export function SDKProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
