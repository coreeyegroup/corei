import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllDocuments } from '@/lib/search-index';
import { cn } from '@/lib/utils';
import StatusBadge from '../ui/StatusBadge';

interface TreeNode {
  stage: number;
  phases: {
    phase: number;
    title: string;
    steps: {
      step: number;
      title: string;
      slug: string;
      status: string;
    }[];
  }[];
}

function buildTree(docs: any[]): TreeNode[] {
  const map = new Map<number, Map<number, any[]>>();
  docs.forEach(doc => {
    if (!map.has(doc.stage)) map.set(doc.stage, new Map());
    const phaseMap = map.get(doc.stage)!;
    if (!phaseMap.has(doc.phase)) phaseMap.set(doc.phase, []);
    phaseMap.get(doc.phase)!.push(doc);
  });
  const tree: TreeNode[] = [];
  for (const [stage, phaseMap] of map) {
    const phases: TreeNode['phases'] = [];
    for (const [phase, steps] of phaseMap) {
      const title = steps[0]?.phaseTitle || `Phase ${phase}`;
      phases.push({
        phase,
        title,
        steps: steps.map(s => ({
          step: s.step,
          title: s.title,
          slug: s.slug,
          status: s.status,
        })),
      });
    }
    tree.push({ stage, phases });
  }
  return tree;
}

export default function Sidebar() {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const location = useLocation();

  useEffect(() => {
    const docs = getAllDocuments();
    const treeData = buildTree(docs);
    setTree(treeData);

    const match = location.pathname.match(/\/stage-(\d+)\/phase-(\d+)\/step-(\d+)/);
    if (match) {
      const [, stage, phase] = match;
      setExpanded(prev => ({
        ...prev,
        [`stage-${stage}`]: true,
        [`phase-${stage}-${phase}`]: true,
      }));
    }
  }, [location]);

  const toggle = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav className="fixed left-0 top-0 w-72 h-screen overflow-y-auto bg-bg-secondary border-r border-border-color p-4 flex-shrink-0">
      <div className="mb-6 pb-4 border-b border-border-color">
        <h1 className="text-gold font-bold text-xl tracking-wide">⚡ COREI</h1>
        <p className="text-text-muted text-sm">Documentation</p>
      </div>

      <ul className="space-y-0.5">
        {tree.map(stage => (
          <li key={`stage-${stage.stage}`}>
            <button
              onClick={() => toggle(`stage-${stage.stage}`)}
              className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-bg-card rounded-md text-text-secondary font-medium transition-colors"
            >
              <span>Stage-{stage.stage}</span>
              <span className="text-text-muted text-xs">
                {expanded[`stage-${stage.stage}`] ? '▼' : '▶'}
              </span>
            </button>

            {expanded[`stage-${stage.stage}`] && (
              <ul className="ml-4 mt-0.5 space-y-0.5">
                {stage.phases.map(phase => (
                  <li key={`phase-${stage.stage}-${phase.phase}`}>
                    <button
                      onClick={() => toggle(`phase-${stage.stage}-${phase.phase}`)}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-left hover:bg-bg-card rounded-md text-sm text-text-secondary transition-colors"
                    >
                      <span>
                        Phase-{phase.phase}
                        <span className="text-text-muted text-xs ml-1.5">{phase.title}</span>
                      </span>
                      <span className="text-text-muted text-xs">
                        {expanded[`phase-${stage.stage}-${phase.phase}`] ? '−' : '+'}
                      </span>
                    </button>

                    {expanded[`phase-${stage.stage}-${phase.phase}`] && (
                      <ul className="ml-4 mt-0.5 space-y-0.5">
                        {phase.steps.map(step => {
                          const isActive = location.pathname === `/stage-${stage.stage}/phase-${phase.phase}/step-${step.step}`;
                          return (
                            <li key={`step-${stage.stage}-${phase.phase}-${step.step}`}>
                              <Link
                                to={`/stage-${stage.stage}/phase-${phase.phase}/step-${step.step}`}
                                className={cn(
                                  "block px-3 py-1 text-sm rounded-md transition-colors",
                                  isActive
                                    ? "bg-bg-card text-gold border-l-2 border-gold"
                                    : "text-text-secondary hover:bg-bg-card"
                                )}
                              >
                                <span>Step-{step.step}: {step.title}</span>
                                <span className="ml-2">
                                  <StatusBadge status={step.status} size="sm" />
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
