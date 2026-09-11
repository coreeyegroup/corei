/**
 * COREI – Workspace Intelligence Panel
 * Stage-25 / Phase-22 / Step-10
 * Displays context-aware insights and recommendations.
 */
import React, { useEffect, useState } from 'react';
import { useIntelligence } from '../../../../intelligence/right-panel/provider';
import type { Insight, Recommendation } from '../../../../intelligence/state/IntelligenceState';

export function IntelligencePanel() {
  const runtime = useIntelligence();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      try {
        const ins = runtime.getInsights();
        const rec = runtime.getRecommendations();
        setInsights(ins);
        setRecommendations(rec);
      } catch (e) {
        console.error('Failed to load intelligence:', e);
      } finally {
        setLoading(false);
      }
    };
    load();

    // Optionally subscribe to runtime refresh events
    // For now, we rely on the provider to trigger re-renders.
    // Could add a listener, but using state updates from runtime is enough.
  }, [runtime]);

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
              <div style={{ fontWeight: 'bold', color: '#f0f2f5' }}>{ins.type}</div>
              <div style={{ fontSize: '13px', color: '#b0b6c0' }}>{ins.message}</div>
              <div style={{ fontSize: '11px', color: '#6a7280', marginTop: '4px' }}>
                Severity: {ins.severity} · {new Date(ins.timestamp).toLocaleString()}
              </div>
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
                Priority: {rec.priority} · Action: {rec.action || 'none'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
