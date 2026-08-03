/**
 * ============================================================================
 * COREI Operating System
 * Infrastructure Runtime Provider
 * ============================================================================
 */

import {
    useEffect,
    type PropsWithChildren
} from "react";

import {
    ribbonRegistry
} from "../../../cognitive/top-consciousness/registry";

import {
    useRibbon
} from "../../../cognitive/top-consciousness/hooks";

import {
    createInfrastructureRibbon
} from "./ribbon-runtime";

export function InfrastructureRuntimeProvider(
    props: PropsWithChildren
) {

    const { setState } = useRibbon();

    useEffect(() => {

        const ribbon =
            createInfrastructureRibbon();

        ribbonRegistry.register(ribbon);

        setState({

            ribbon,

            initialized: true,

            loading: false,

            mode: "ready",

            experience: "Infrastructure",

            reality: "Infrastructure Operations",

            health: "healthy",

            version: "23.4.0",

            lastUpdated: new Date()

        });

    }, [setState]);

    return props.children;

}

