export interface EnvironmentStateContract {
  environment:
    | "development"
    | "staging"
    | "production";

  region: string;

  deployment_id: string;

  updated_at: string;
}
