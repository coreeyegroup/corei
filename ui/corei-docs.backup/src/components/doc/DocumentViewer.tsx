import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import yaml from 'yaml';
import { getAllDocuments } from '@/lib/search-index';
import SourceLink from './SourceLink';
import TableOfContents from './TableOfContents';
import StatusBadge from '../ui/StatusBadge';

export default function DocumentViewer() {
  const { stage, phase, step } = useParams<{ stage: string; phase: string; step: string }>();
  const [doc, setDoc] = useState<any>(null);
  const [content, setContent] = useState('');
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  const extractTOC = (markdown: string) => {
    const headings: { id: string; text: string; level: number }[] = [];
    const lines = markdown.split('\n');
    lines.forEach(line => {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        headings.push({ id, text, level });
      }
    });
    return headings;
  };

  useEffect(() => {
    const slug = `stage-${stage}-phase-${phase}-step-${step}`;
    fetch(`/content/stage-${stage}/phase-${phase}/step-${step}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(text => {
        // Parse frontmatter using YAML parser
        const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n/);
        let data: any = {};
        let body = text;
        if (frontmatterMatch) {
          try {
            data = yaml.parse(frontmatterMatch[1]);
          } catch (e) {
            console.warn('Failed to parse frontmatter', e);
          }
          body = text.slice(frontmatterMatch[0].length);
        }
        setDoc({ ...data, slug });
        setContent(body);
        setToc(extractTOC(body));
      })
      .catch(() => {
        // Fallback to search index
        const docs = getAllDocuments();
        const found = docs.find(d =>
          d.stage === parseInt(stage!) &&
          d.phase === parseInt(phase!) &&
          d.step === parseInt(step!)
        );
        if (found) {
          setDoc(found);
          setContent(found.content || '');
          setToc(extractTOC(found.content || ''));
        } else {
          setDoc(null);
        }
      });
  }, [stage, phase, step]);

  const SourceLinkRenderer = ({ href, children }: any) => {
    if (href && href.startsWith('src://')) {
      const path = href.replace('src://', '');
      return <SourceLink path={path} label={children || path} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">{children}</a>;
  };

  if (!doc) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Document not found.</div>;
  }

  return (
    <div className="flex gap-8">
      <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
        <TableOfContents items={toc} />
      </aside>

      <div className="flex-1 min-w-0">
        <div className="mb-8 pb-6 border-b border-border-color">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Stage-{doc.stage} · Phase-{doc.phase} · Step-{doc.step}
              </h1>
              <h2 className="text-xl text-gold">{doc.title}</h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <StatusBadge status={doc.status} />
                {doc.commit && (
                  <span className="text-xs text-text-muted">
                    Commit: <code className="bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary">{doc.commit}</code>
                  </span>
                )}
                {doc.tag && (
                  <span className="text-xs text-text-muted">
                    Tag: <code className="bg-bg-tertiary px-2 py-0.5 rounded text-text-secondary">{doc.tag}</code>
                  </span>
                )}
                <span className="text-xs text-text-muted">Updated: {doc.updated || 'N/A'}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-bg-tertiary border border-border-color rounded-md text-text-secondary hover:bg-bg-card transition-colors">
                📄 PDF
              </button>
              <button className="px-3 py-1.5 text-sm bg-bg-tertiary border border-border-color rounded-md text-text-secondary hover:bg-bg-card transition-colors">
                🔗 Permalink
              </button>
            </div>
          </div>
        </div>

        {doc.source_files && Array.isArray(doc.source_files) && doc.source_files.length > 0 && (
          <div className="mb-6 p-4 bg-bg-card rounded-md border border-border-color">
            <h4 className="text-sm font-medium text-text-secondary mb-2">📁 Source Files</h4>
            <div className="flex flex-wrap gap-2">
              {doc.source_files.map((file: string) => (
                <SourceLink key={file} path={file} />
              ))}
            </div>
          </div>
        )}

        <div className="prose prose-invert prose-gold max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: SourceLinkRenderer,
              code: ({ className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                if (!match) {
                  return (
                    <code {...props} className="bg-bg-tertiary px-1.5 py-0.5 rounded text-sm border border-border-color">
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-bg-tertiary p-4 rounded-md border border-border-color overflow-x-auto">
                    <code className={className}>{children}</code>
                  </pre>
                );
              },
              table: ({ children }) => (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border-color">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border-color px-4 py-2 bg-bg-tertiary text-left text-text-primary">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border-color px-4 py-2">{children}</td>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gold pl-4 py-1 my-4 bg-bg-card rounded-r-md">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-6 border-t border-border-color flex justify-between text-sm">
          <button className="text-text-muted hover:text-text-secondary transition-colors">← Previous Step</button>
          <button className="text-text-muted hover:text-text-secondary transition-colors">Next Step →</button>
        </div>
      </div>
    </div>
  );
}
