import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface CodeViewerProps {
  path: string;
  onClose: () => void;
}

export default function CodeViewer({ path, onClose }: CodeViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSource = async () => {
      try {
        const url = `/source/${path}`;
        const res = await fetch(url);
        if (!res.ok) {
          const githubUrl = `https://raw.githubusercontent.com/coreeyegroup/corei/main/ui/corei-os/${path}`;
          const ghRes = await fetch(githubUrl);
          if (!ghRes.ok) throw new Error('File not found locally or on GitHub');
          const text = await ghRes.text();
          setContent(text);
        } else {
          const text = await res.text();
          setContent(text);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSource();
  }, [path]);

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-border-color">
        <div className="flex items-center gap-2">
          <span className="text-text-muted">📄</span>
          <span className="text-text-primary font-mono text-sm">{path}</span>
        </div>
        <Dialog.Close asChild>
          <button className="text-text-muted hover:text-text-secondary text-lg">✕</button>
        </Dialog.Close>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading && (
          <div className="flex items-center justify-center h-32 text-text-muted">Loading…</div>
        )}
        {error && (
          <div className="flex items-center justify-center h-32 text-red-400">{error}</div>
        )}
        {!loading && !error && (
          <pre className="bg-bg-secondary p-4 rounded-md border border-border-color overflow-auto text-sm font-mono text-text-secondary whitespace-pre-wrap">
            {content}
          </pre>
        )}
      </div>

      <div className="flex justify-between items-center p-4 border-t border-border-color">
        <div className="text-xs text-text-muted">
          {content ? `${content.split('\n').length} lines` : ''}
        </div>
        <div className="flex gap-3">
          <a
            href={`https://github.com/coreeyegroup/corei/blob/main/ui/corei-os/${path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gold hover:underline"
          >
            View on GitHub →
          </a>
          <button onClick={onClose} className="text-xs text-text-muted hover:text-text-secondary">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
