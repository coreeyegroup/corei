import { RibbonWidgets } from "../widgets";

export const realityZone = {

    id: "reality",

    order: 3,

    title: "Reality",

    description:
        "Current operational reality.",

    widgets: [

        RibbonWidgets.TERMINAL,

        RibbonWidgets.CLUSTER,

        RibbonWidgets.REGION,

        RibbonWidgets.SCOPE

    ]

} as const;
