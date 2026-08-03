import { RibbonWidgets } from "../widgets";

export const contextZone = {

    id: "context",

    order: 4,

    title: "Context",

    description:
        "Current operational context.",

    widgets: [

        RibbonWidgets.ACTIVE_WORKSPACE,

        RibbonWidgets.ACTIVE_INVESTIGATION,

        RibbonWidgets.CURRENT_DOMAIN,

        RibbonWidgets.SELECTED_RESOURCE

    ]

} as const;
