import { create } from "zustand";

import type {

    DockLayout

} from "../contracts/dock-layout";

interface DockState{

    layout:DockLayout;

    setLayout(

        layout:DockLayout

    ):void;

}

export const useDockState=

create<DockState>((set)=>({

    layout:{

        leftWidth:220,

        rightWidth:220,

        bottomHeight:220

    },

    setLayout:(layout)=>

        set({

            layout

        })

}));
