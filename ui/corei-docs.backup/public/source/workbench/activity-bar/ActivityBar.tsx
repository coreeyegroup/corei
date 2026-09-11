/**
 * ============================================================================
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 *
 * FILE:
 * ActivityBar.tsx
 *
 * PURPOSE:
 * COREI Institutional Navigation Surface
 *
 * RUNTIME:
 * Existing activity runtime preserved
 * ============================================================================
 */

import {
    ChartCandlestick,
    FolderTree,
    Server,
    Shield,
    Bot,
    Settings
} from "lucide-react";

import {
    useWorkbenchState,
    type ActivityType
} from "../state";

import {
    activityRuntime
} from "./runtime/activity-runtime";

import "../styles/workspace-navigation.css";


interface ActivityItem {

    id: ActivityType;

    icon: React.ComponentType<{
        size?: number;
    }>;

}


const ITEMS: readonly ActivityItem[] = [

    {
        id: "trading",
        icon: ChartCandlestick
    },

    {
        id: "research",
        icon: FolderTree
    },

    {
        id: "infrastructure",
        icon: Server
    },

    {
        id: "risk",
        icon: Shield
    },

    {
        id: "ai",
        icon: Bot
    }

];


export function ActivityBar(): React.JSX.Element {

    const activity = useWorkbenchState(
        state => state.activity
    );


    return (

        <aside className="corei-activity-bar">

            <div className="corei-activity-items">

                {
                    ITEMS.map(item => {

                        const Icon = item.icon;

                        const active =
                            activity === item.id;


                        return (

                            <button

                                key={item.id}

                                type="button"

                                className={
                                    active
                                    ? "corei-activity-item active"
                                    : "corei-activity-item"
                                }

                                onClick={() =>
                                    activityRuntime.activate(
                                        item.id
                                    )
                                }

                                onMouseEnter={() =>
                                    activityRuntime.hover(
                                        item.id
                                    )
                                }

                                onMouseLeave={() =>
                                    activityRuntime.hover(
                                        null
                                    )
                                }

                            >

                                <Icon size={18}/>

                            </button>

                        );

                    })
                }

            </div>


            <button

                type="button"

                className="corei-activity-item"

            >

                <Settings size={18}/>

            </button>


        </aside>

    );

}


export default ActivityBar;
