import type { CoreiDocument } from './types';

class KnowledgeRegistry {
  private documents: CoreiDocument[] = [];

  loadDocuments(docs: CoreiDocument[]) {
    this.documents = docs;
    console.log(`✅ COREI Knowledge Centre loaded with ${this.documents.length} documents`);
  }

  getAllAssets(): CoreiDocument[] {
    return this.documents;
  }

  getDocumentById(id: string): CoreiDocument | undefined {
    return this.documents.find(doc => doc.id === id);
  }
}

// Singleton pattern for institutional stability
export const registry = new KnowledgeRegistry();
