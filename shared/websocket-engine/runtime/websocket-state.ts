import type { SubscriptionContract } from "../contracts/subscription.contract";

export interface WebsocketState {
  connected: boolean;

  active_channel_count: number;

  subscriptions: SubscriptionContract[];

  last_message_at: string | null;
}
