export interface CoreiDocument {
  id: string;           // e.g., COREI-AR-03.04
  title: string;        // Clean title, no .md.md garbage
  path: string;         // Real source path
  status: 'APPROVED' | 'DRAFT' | 'ARCHIVED';
  authority: 'AUTHORITATIVE' | 'GOVERNING';
  domain: string;       // e.g., ARCHITECTURE
  version: string;
  owner: string;
  lastUpdated: string;
  type: 'document' | 'folder';
  children?: CoreiDocument[];
}

export interface WorkspaceTab {
  id: string;
  documentId: string;
  title: string;
}
