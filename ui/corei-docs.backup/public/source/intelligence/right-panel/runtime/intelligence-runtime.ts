/**
 * COREI – Intelligence Runtime
 * Stage-25 / Phase-22
 * Runtime wrapper for intelligence service.
 */
import { intelligenceService } from "../services/intelligence-service";
import type { Insight, Recommendation, WorkspaceContext } from "../services/intelligence-service";

export class IntelligenceRuntime {
    async getInsights(): Promise<Insight[]> {
        return intelligenceService.generateInsights();
    }

    async getRecommendations(): Promise<Recommendation[]> {
        return intelligenceService.generateRecommendations();
    }

    getContext(): WorkspaceContext {
        return intelligenceService.getCurrentContext();
    }

    async updateContext(context: Partial<WorkspaceContext>): Promise<void> {
        return intelligenceService.updateContext(context);
    }
}

export const intelligenceRuntime = new IntelligenceRuntime();
