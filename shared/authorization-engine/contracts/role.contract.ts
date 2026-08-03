export interface RoleContract {
  role_id: string;

  role_name: string;

  parent_role_id: string | null;

  authority_level: number;

  permissions: string[];
}
