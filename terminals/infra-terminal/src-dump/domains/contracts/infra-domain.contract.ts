export interface InfraDomainContract {
  domain_id: string;

  code: string;

  name: string;

  description: string;

  route: string;

  icon: string;

  classification:
    | "internal"
    | "confidential"
    | "restricted";

  permissions: string[];
}
