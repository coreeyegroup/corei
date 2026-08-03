import {

    workspaceRuntime

} from "./workspace-runtime";

workspaceRuntime.register({

    id: "trading",

    name: "Trading",

    panels: [

        {

            id: "welcome",

            title: "Welcome",

            component: "welcome",

            closable: false

        }

    ]

});
