/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-05-B
 *
 * FILE:
 * TopRibbon.tsx
 *
 * PURPOSE:
 * Institutional Header Composition Surface
 *
 ******************************************************************************/

import type {
    ReactElement
} from "react";

import "../styles/top-ribbon.css";


import {
    RibbonInstitutionIdentity
} from "./RibbonInstitutionIdentity";


import {
    RibbonEnvironmentIdentity
} from "./RibbonEnvironmentIdentity";


import {
    RibbonRuntime
} from "./RibbonRuntime";


import {
    RibbonSessionContext
} from "./RibbonSessionContext";


import {
    RibbonWorkspace
} from "./RibbonWorkspace";


import {
    RibbonNotifications
} from "./RibbonNotifications";


import {
    DEFAULT_SHELL_HEADER_CONTEXT
} from "../models/default-shell-header-context";


export function TopRibbon(): ReactElement {

    const context =
        DEFAULT_SHELL_HEADER_CONTEXT;


    return (

        <header
            className="corei-top-ribbon"
            data-ribbon-surface="institutional"
        >

            <RibbonInstitutionIdentity
                identity={
                    context.institution
                }
            />


            <RibbonEnvironmentIdentity
                environment={
                    context.environment
                }
            />


            <RibbonRuntime
                runtime={
                    context.runtime
                }
            />


            <RibbonSessionContext
                session={
                    context.session
                }
            />


            <RibbonWorkspace
                workspace={
                    context.workspace
                }
            />


            <RibbonNotifications
                notifications={
                    context.notifications
                }
            />

        </header>

    );

}


export default TopRibbon;
