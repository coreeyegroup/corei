import { useSearchParams, Link } from 'react-router-dom';
import { search } from '@/lib/search-index';
import StatusBadge from '@/components/ui/StatusBadge';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query.length >= 2 ? search(query) : [];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-text-primary">Search Results</h1>
      <p className="text-text-muted mt-1">
        {query ? `Showing results for "${query}"` : 'Enter a search term'}
      </p>

      {results.length === 0 && query.length >= 2 && (
        <div className="mt-8 text-text-muted">No documents found.</div>
      )}

      <div className="mt-6 space-y-4">
        {results.map((doc: any) => {
          const slugParts = doc.slug.split('-');
          const stage = slugParts[1];
          const phase = slugParts[3];
          const step = slugParts[5];
          return (
            <Link
              key={doc.id}
              to={`/stage-${stage}/phase-${phase}/step-${step}`}
              className="block bg-bg-card p-4 rounded-md border border-border-color hover:border-gold transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-text-primary">{doc.title}</div>
                  <div className="text-sm text-text-muted">
                    Stage-{stage} · Phase-{phase} · Step-{step}
                  </div>
                </div>
                <StatusBadge status={doc.status} />
              </div>
              {doc.source_files && doc.source_files.length > 0 && (
                <div className="mt-2 text-xs text-text-muted">
                  📁 {doc.source_files.length} source file(s)
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
