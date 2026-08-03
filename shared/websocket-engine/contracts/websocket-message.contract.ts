export interface WebsocketMessageContract {
  message_id: string;

  correlation_id: string | null;

  channel: string;

  terminal_scope:
    | "infra"
    | "trading"
    | "risk"
    | "executive"
    | "research"
    | "compliance";

  classification:
    | "internal"
    | "confidential"
    | "restricted";

  event_type: string;

  timestamp: string;

  payload: Record<string, unknown>;
}
