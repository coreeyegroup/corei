import { RibbonWidgets } from "../widgets";

export const authorityZone = {

    id: "authority",

    order: 5,

    title: "Authority",

    description:
        "Current operational authority.",

    widgets: [

        RibbonWidgets.OPERATOR_ROLE,

        RibbonWidgets.PERMISSION_LEVEL,

        RibbonWidgets.APPROVAL_MODE,

        RibbonWidgets.EXECUTION_AUTHORITY

    ]

} as const;
