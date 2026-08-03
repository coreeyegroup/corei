/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-02
 *
 * FILE
 * Explorer.tsx
 *
 * PURPOSE
 * Runtime Driven Explorer
 * ============================================================================
 */

import {

    Plus,
    MoreHorizontal

} from "lucide-react";

import {

    ExplorerItem

} from "./ExplorerItem";

import {

    ExplorerSection

} from "./ExplorerSection";

import {

    useWorkbenchState

} from "../state";

export function Explorer(): React.JSX.Element {

    const activity = useWorkbenchState(

        state => state.activity

    );

    return (

        <div
            style={{
                height: "100%",
                background: "#202020",
                display: "flex",
                flexDirection: "column"
            }}
        >

            <div
                style={{
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    borderBottom: "1px solid #313131",
                    fontSize: 12,
                    fontWeight: 600
                }}
            >

                <span>

                    {activity.toUpperCase()}

                </span>

                <div
                    style={{
                        display: "flex",
                        gap: 6
                    }}
                >

                    <Plus size={15}/>

                    <MoreHorizontal size={15}/>

                </div>

            </div>

            <div
                style={{
                    flex: 1,
                    overflow: "auto"
                }}
            >

                {

                    activity === "trading" && (

                        <>

                            <ExplorerSection
                                id="watchlists"
                                title="WATCHLISTS"
                            >

                                <ExplorerItem
                                    id="forex"
                                    label="Forex"
                                />

                                <ExplorerItem
                                    id="indices"
                                    label="Indices"
                                />

                                <ExplorerItem
                                    id="commodities"
                                    label="Commodities"
                                />

                                <ExplorerItem
                                    id="crypto"
                                    label="Crypto"
                                />

                            </ExplorerSection>

                            <ExplorerSection
                                id="trading"
                                title="TRADING"
                            >

                                <ExplorerItem
                                    id="charts"
                                    label="Charts"
                                />

                                <ExplorerItem
                                    id="orders"
                                    label="Orders"
                                />

                                <ExplorerItem
                                    id="positions"
                                    label="Positions"
                                />

                                <ExplorerItem
                                    id="portfolio"
                                    label="Portfolio"
                                />

                            </ExplorerSection>

                        </>

                    )

                }

                {

                    activity === "infrastructure" && (

                        <ExplorerSection
                            id="services"
                            title="SERVICES"
                        >

                            <ExplorerItem id="kubernetes" label="Kubernetes"/>

                            <ExplorerItem id="grafana" label="Grafana"/>

                            <ExplorerItem id="prometheus" label="Prometheus"/>

                            <ExplorerItem id="kafka" label="Kafka"/>

                            <ExplorerItem id="vault" label="Vault"/>

                            <ExplorerItem id="postgres" label="PostgreSQL"/>

                            <ExplorerItem id="redis" label="Redis"/>

                        </ExplorerSection>

                    )

                }

                {

                    activity === "research" && (

                        <ExplorerSection
                            id="research"
                            title="RESEARCH"
                        >

                            <ExplorerItem id="notes" label="Market Notes"/>

                            <ExplorerItem id="strategies" label="Strategies"/>

                            <ExplorerItem id="journals" label="Journals"/>

                        </ExplorerSection>

                    )

                }

                {

                    activity === "risk" && (

                        <ExplorerSection
                            id="risk"
                            title="RISK"
                        >

                            <ExplorerItem id="exposure" label="Exposure"/>

                            <ExplorerItem id="limits" label="Limits"/>

                            <ExplorerItem id="margin" label="Margin"/>

                        </ExplorerSection>

                    )

                }

                {

                    activity === "ai" && (

                        <ExplorerSection
                            id="ai"
                            title="AI"
                        >

                            <ExplorerItem id="agents" label="Agents"/>

                            <ExplorerItem id="prompts" label="Prompts"/>

                            <ExplorerItem id="models" label="Models"/>

                        </ExplorerSection>

                    )

                }

            </div>

        </div>

    );

}
