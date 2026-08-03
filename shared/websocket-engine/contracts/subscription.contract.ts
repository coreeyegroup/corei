export interface SubscriptionContract {
  subscription_id: string;

  channel_id: string;

  consumer_id: string;

  consumer_type:
    | "terminal"
    | "workspace"
    | "view"
    | "panel"
    | "widget";

  status:
    | "active"
    | "paused"
    | "stopped";

  created_at: string;
}
