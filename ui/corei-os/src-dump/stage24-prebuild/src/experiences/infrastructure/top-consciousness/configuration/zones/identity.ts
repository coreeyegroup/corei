import { RibbonWidgets } from "../widgets";

export const identityZone = {

    id: "identity",

    order: 2,

    title: "Identity",

    description:
        "Operator identity.",

    widgets: [

        RibbonWidgets.OPERATOR,

        RibbonWidgets.ROLE,

        RibbonWidgets.ORGANIZATION,

        RibbonWidgets.SESSION

    ]

} as const;
