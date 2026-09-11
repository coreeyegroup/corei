import { useState, useEffect } from 'react';
import { getAllDocuments } from '@/lib/search-index';
import { Link } from 'react-router-dom';

export default function Home() {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    const all = getAllDocuments();
    setDocs(all);
  }, []);

  const stages = [...new Set(docs.map(d => d.stage))].sort((a, b) => a - b);
  const total = docs.length;
  const frozen = docs.filter(d => d.status === 'FROZEN').length;
  const complete = docs.filter(d => d.status === 'COMPLETE').length;
  const inProgress = docs.filter(d => d.status === 'IN_PROGRESS').length;
  // pending is unused, we can keep it but not use it

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-text-primary">COREI Documentation</h1>
      <p className="text-text-muted mt-2">Institutional Operating System — Stage-25</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-bg-card p-4 rounded-md border border-border-color">
          <div className="text-2xl font-bold text-gold">{total}</div>
          <div className="text-sm text-text-muted">Total Documents</div>
        </div>
        <div className="bg-bg-card p-4 rounded-md border border-border-color">
          <div className="text-2xl font-bold text-blue-400">{frozen}</div>
          <div className="text-sm text-text-muted">Frozen</div>
        </div>
        <div className="bg-bg-card p-4 rounded-md border border-border-color">
          <div className="text-2xl font-bold text-green-400">{complete}</div>
          <div className="text-sm text-text-muted">Complete</div>
        </div>
        <div className="bg-bg-card p-4 rounded-md border border-border-color">
          <div className="text-2xl font-bold text-yellow-400">{inProgress}</div>
          <div className="text-sm text-text-muted">In Progress</div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {stages.map(stage => {
          const stageDocs = docs.filter(d => d.stage === stage);
          const phases = [...new Set(stageDocs.map(d => d.phase))];
          return (
            <div key={stage} className="bg-bg-card rounded-md border border-border-color p-4">
              <h2 className="text-lg font-semibold text-text-primary">Stage-{stage}</h2>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                {phases.map(phase => {
                  const phaseDocs = stageDocs.filter(d => d.phase === phase);
                  const first = phaseDocs[0];
                  return (
                    <Link
                      key={phase}
                      to={`/stage-${stage}/phase-${phase}/step-${first?.step || 1}`}
                      className="block p-2 rounded hover:bg-bg-tertiary transition-colors"
                    >
                      <div className="text-sm text-text-secondary">Phase-{phase}</div>
                      <div className="text-xs text-text-muted">{phaseDocs.length} steps</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
