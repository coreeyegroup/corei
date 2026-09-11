import FlexSearch from 'flexsearch';

let searchIndex: any = null;
let documents: any[] = [];

export function buildSearchIndex(docs: any[]) {
  documents = docs;
  searchIndex = new FlexSearch.Document({
    document: {
      id: 'id',
      index: ['title', 'content'],
      store: ['id', 'stage', 'phase', 'step', 'title', 'slug', 'status', 'source_files'],
    },
    tokenize: 'full',
    context: { resolution: 9, depth: 2, bidirectional: true },
  });
  docs.forEach(doc => {
    searchIndex!.add(doc);
  });
}

export function search(query: string): any[] {
  if (!searchIndex || query.length < 2) return [];
  const results = searchIndex.search(query, { limit: 100, enrich: true });
  const flat = results.flatMap((r: any) => r.result);
  const unique = Array.from(new Map(flat.map((item: any) => [item.id, item])).values());
  return unique;
}

export function getAllDocuments(): any[] {
  return documents;
}
