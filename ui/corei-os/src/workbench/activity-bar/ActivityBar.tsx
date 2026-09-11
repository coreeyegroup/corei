/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25 / PHASE-17
 *
 * ACTIVITY BAR
 *
 * Institutional immediate-navigation surface.
 *
 * Existing capabilities consumed:
 * - Workbench activity state
 * - Activity runtime
 * - Sidebar runtime
 *
 * No new navigation provider.
 * No new sidebar runtime.
 * No new state model.
 *
 ******************************************************************************/

import {
    ChartCandlestick,
    FolderTree,
    Server,
    Shield,
    Bot,
    Settings,
    BarChart3,
    BriefcaseBusiness,
    MonitorCog,
    Gavel,
    HelpCircle
} from "lucide-react";

import {
    useWorkbenchState,
    type ActivityType
} from "../state";

import {
    activityRuntime
} from "./runtime/activity-runtime";

import {
    sidebarRuntime
} from "../sidebar/runtime/sidebar-runtime";

import "../styles/workspace-navigation.css";


/* ==========================================================================
 * TYPES
 * ========================================================================== */

interface ActivityItem {

    readonly id: ActivityType;

    readonly label: string;

    readonly shortLabel: string;

    readonly icon: React.ComponentType<{
        size?: number;
        strokeWidth?: number;
    }>;
}


/* ==========================================================================
 * OPERATING DOMAINS
 * ========================================================================== */

const ITEMS: readonly ActivityItem[] = [

    {
        id: "trading",
        label: "Trading",
        shortLabel: "TRD",
        icon: ChartCandlestick
    },

    {
        id: "infrastructure",
        label: "Infrastructure",
        shortLabel: "INF",
        icon: Server
    },

    {
        id: "risk",
        label: "Risk",
        shortLabel: "RSK",
        icon: Shield
    },

    {
        id: "market",
        label: "Market",
        shortLabel: "MKT",
        icon: BarChart3
    },

    {
        id: "research",
        label: "Research",
        shortLabel: "RES",
        icon: FolderTree
    },

    {
        id: "portfolio",
        label: "Portfolio",
        shortLabel: "PF",
        icon: BriefcaseBusiness
    },

    {
        id: "corei-os",
        label: "COREI OS",
        shortLabel: "OS",
        icon: MonitorCog
    },

    {
        id: "executive",
        label: "Executive",
        shortLabel: "EXE",
        icon: Gavel
    },

    {
        id: "compliance",
        label: "Compliance",
        shortLabel: "CMP",
        icon: Shield
    },

    {
        id: "ai",
        label: "AI",
        shortLabel: "AI",
        icon: Bot
    }

];


/* ==========================================================================
 * ACTIVITY BAR
 * ========================================================================== */

export function ActivityBar(): React.JSX.Element {

    const activity =
        useWorkbenchState(
            state => state.activity
        );


    /* ======================================================================
     * EXISTING ACTIVITY + SIDEBAR RUNTIME COORDINATION
     *
     * Different domain:
     *     select domain
     *     open sidebar
     *
     * Same domain:
     *     toggle existing sidebar
     * ====================================================================== */

    const handleActivityClick =
        (nextActivity: ActivityType): void => {

            const currentActivity =
                activityRuntime.getActive();


            if (
                currentActivity === nextActivity
            ) {

                sidebarRuntime.toggle();

                return;

            }


            activityRuntime.activate(
                nextActivity
            );

            sidebarRuntime.open();

        };


    return (

        <aside
            className="corei-activity-bar"
            aria-label="COREI operating domains"
        >

            <div
                className="corei-activity-items"
                role="navigation"
                aria-label="Operating domains"
            >

                {ITEMS.map(item => {

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
                            data-activity-id={item.id}
                            data-activity-active={
                                active
                                    ? "true"
                                    : "false"
                            }
                            aria-label={item.label}
                            aria-current={
                                active
                                    ? "page"
                                    : undefined
                            }
                            title={item.label}
                            onClick={() =>
                                handleActivityClick(
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

                            <span
                                className="corei-activity-icon"
                                aria-hidden="true"
                            >
                                <Icon
                                    size={16}
                                    strokeWidth={1.7}
                                />
                            </span>

                            <span
                                className="corei-activity-short"
                                aria-hidden="true"
                            >
                                {item.shortLabel}
                            </span>

                        </button>

                    );

                })}

            </div>


            {/* =================================================================
             * PLATFORM UTILITIES
             * ================================================================= */}

            <div
                className="corei-activity-utilities"
                aria-label="Platform utilities"
            >

                <button
                    type="button"
                    className="
                        corei-activity-item
                        corei-activity-utility
                    "
                    aria-label="Help"
                    title="Help"
                    data-activity-id="help"
                >

                    <span
                        className="corei-activity-icon"
                        aria-hidden="true"
                    >
                        <HelpCircle
                            size={16}
                            strokeWidth={1.7}
                        />
                    </span>

                    <span
                        className="corei-activity-short"
                        aria-hidden="true"
                    />

                </button>


                <button
                    type="button"
                    className="
                        corei-activity-item
                        corei-activity-utility
                    "
                    aria-label="Settings"
                    title="Settings"
                    data-activity-id="settings"
                >

                    <span
                        className="corei-activity-icon"
                        aria-hidden="true"
                    >
                        <Settings
                            size={16}
                            strokeWidth={1.7}
                        />
                    </span>

                    <span
                        className="corei-activity-short"
                        aria-hidden="true"
                    />

                </button>

            </div>

        </aside>

    );
}


export default ActivityBar;
