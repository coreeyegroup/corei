/**
 * COREI – Workspace Intelligence Panel
 * Stage-25 / Phase-22
 * Displays context-aware insights and recommendations.
 */
import React, { useState, useEffect } from 'react';
import { intelligenceRuntime } from '../../../../intelligence/right-panel/runtime/intelligence-runtime';
import type { Insight, Recommendation } from '../../../../intelligence/right-panel/services/intelligence-service';

export function IntelligencePanel() {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [ins, rec] = await Promise.all([
                    intelligenceRuntime.getInsights(),
                    intelligenceRuntime.getRecommendations()
                ]);
                setInsights(ins);
                setRecommendations(rec);
            } catch (e) {
                console.error('Failed to load intelligence:', e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return <div style={{ padding: '20px', color: '#8e96a3' }}>Loading intelligence...</div>;
    }

    return (
        <div style={{ padding: '20px', color: '#d7dce2', height: '100%', overflow: 'auto' }}>
            <h3 style={{ color: '#cea96f', marginBottom: '16px' }}>Workspace Intelligence</h3>

            <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#9ecb5d', marginBottom: '8px' }}>Insights</h4>
                {insights.length === 0 ? (
                    <p style={{ color: '#8e96a3', fontSize: '14px' }}>No insights available.</p>
                ) : (
                    insights.map(ins => (
                        <div key={ins.id} style={{ background: '#1a1f28', borderRadius: '6px', padding: '12px', marginBottom: '8px' }}>
                            <div style={{ fontWeight: 'bold', color: '#f0f2f5' }}>{ins.title}</div>
                            <div style={{ fontSize: '13px', color: '#b0b6c0' }}>{ins.description}</div>
                            <div style={{ fontSize: '11px', color: '#6a7280', marginTop: '4px' }}>Source: {ins.source}</div>
                        </div>
                    ))
                )}
            </div>

            <div>
                <h4 style={{ color: '#cea96f', marginBottom: '8px' }}>Recommendations</h4>
                {recommendations.length === 0 ? (
                    <p style={{ color: '#8e96a3', fontSize: '14px' }}>No recommendations available.</p>
                ) : (
                    recommendations.map(rec => (
                        <div key={rec.id} style={{ borderLeft: '3px solid #cea96f', background: '#1a1f28', borderRadius: '4px', padding: '12px', marginBottom: '8px' }}>
                            <div style={{ fontWeight: 'bold', color: '#f0f2f5' }}>{rec.title}</div>
                            <div style={{ fontSize: '13px', color: '#b0b6c0' }}>{rec.description}</div>
                            <div style={{ fontSize: '11px', color: '#6a7280', marginTop: '4px' }}>
                                Confidence: {Math.round(rec.confidence * 100)}% · Action: {rec.action}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
