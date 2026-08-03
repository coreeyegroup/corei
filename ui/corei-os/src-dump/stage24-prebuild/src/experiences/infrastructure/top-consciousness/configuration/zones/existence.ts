import { RibbonWidgets } from "../widgets";

export const existenceZone = {

    id: "existence",

    order: 1,

    title: "Existence",

    description:
        "Current operating existence.",

    widgets: [

        RibbonWidgets.COREI_IDENTITY,

        RibbonWidgets.ENVIRONMENT,

        RibbonWidgets.PLATFORM,

        RibbonWidgets.WORKSPACE

    ]

} as const;
