export interface ContextStateContract {
  resource_id: string | null;

  resource_type: string | null;

  resource_name: string | null;

  classification:
    | "internal"
    | "confidential"
    | "restricted"
    | null;

  updated_at: string;
}
