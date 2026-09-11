/**
 * =============================================================================
 * COREI Operating System
 * Foundation
 * Theme Provider
 * =============================================================================
 */

import type {

    PropsWithChildren

} from "react";

export function ThemeProvider(

    props: PropsWithChildren

): React.JSX.Element {

    return <>{props.children}</>;

}
