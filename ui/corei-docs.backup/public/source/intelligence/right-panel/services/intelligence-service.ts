/**
 * COREI – Intelligence Service
 * Stage-25 / Phase-22
 * Provides insights and recommendations based on workspace context.
 */
import { workspaceRuntime } from "../../../workbench/workspace/runtime/workspace-runtime";
import { panelRuntime } from "../../../workbench/panels/runtime/panel-runtime";

export interface Insight {
    id: string;
    title: string;
    description: string;
    priority: number;
    source: string;
    timestamp: number;
}

export interface Recommendation {
    id: string;
    title: string;
    description: string;
    confidence: number;
    action: string;
    target: string;
}

export interface WorkspaceContext {
    workspaceId: string;
    activePanels: string[];
    recentCommands: string[];
    timestamp: number;
}

class IntelligenceService {
    private context: WorkspaceContext | null = null;

    async generateInsights(): Promise<Insight[]> {
        const context = this.getCurrentContext();
        const insights: Insight[] = [
            {
                id: "ins-1",
                title: "Workspace Initialized",
                description: `Workspace "${context?.workspaceId || 'default'}" is ready.`,
                priority: 0,
                source: "system",
                timestamp: Date.now()
            },
            {
                id: "ins-2",
                title: "Market Data Available",
                description: "Market data feeds are connected and streaming.",
                priority: 1,
                source: "market",
                timestamp: Date.now()
            }
        ];
        return insights;
    }

    async generateRecommendations(): Promise<Recommendation[]> {
        const recommendations: Recommendation[] = [
            {
                id: "rec-1",
                title: "Open Charts Panel",
                description: "You are in a trading workspace. Open the Charts panel to view market data.",
                confidence: 0.9,
                action: "openPanel charts",
                target: "charts"
            },
            {
                id: "rec-2",
                title: "Run Market Analysis",
                description: "Analyze current market trends with AI.",
                confidence: 0.7,
                action: "executeCommand analyze",
                target: "analysis"
            }
        ];
        return recommendations;
    }

    getCurrentContext(): WorkspaceContext {
        if (this.context) return this.context;
        const workspaceId = workspaceRuntime.current() || 'default';
        const panels = panelRuntime.list();
        const panelIds = panels.map((p: any) => p.id);
        this.context = {
            workspaceId,
            activePanels: panelIds,
            recentCommands: [],
            timestamp: Date.now()
        };
        return this.context;
    }

    async updateContext(context: Partial<WorkspaceContext>): Promise<void> {
        if (!this.context) {
            this.context = this.getCurrentContext();
        }
        this.context = { ...this.context, ...context };
    }
}

export const intelligenceService = new IntelligenceService();
