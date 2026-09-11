import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { search } from '@/lib/search-index';
import StatusBadge from '../ui/StatusBadge';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 2) {
        const hits = search(query);
        setResults(hits);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (slug: string) => {
    const parts = slug.split('-');
    const stage = parts[1];
    const phase = parts[3];
    const step = parts[5];
    navigate(`/stage-${stage}/phase-${phase}/step-${step}`);
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-bg-tertiary border border-border-color rounded-md px-3 py-1.5 focus-within:border-gold transition-colors">
        <span className="text-text-muted mr-2">🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search documents…"
          className="bg-transparent border-none outline-none text-text-primary w-64 placeholder-text-muted"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-text-muted hover:text-text-secondary"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-border-color rounded-md shadow-xl max-h-96 overflow-y-auto z-50">
          {results.map(doc => (
            <div
              key={doc.id}
              className="px-4 py-2 hover:bg-bg-card cursor-pointer"
              onMouseDown={() => handleSelect(doc.slug)}
            >
              <div className="font-medium text-text-primary">{doc.title}</div>
              <div className="text-xs text-text-muted">
                Stage-{doc.stage} · Phase-{doc.phase} · Step-{doc.step}
                <span className="ml-2">
                  <StatusBadge status={doc.status} size="sm" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
