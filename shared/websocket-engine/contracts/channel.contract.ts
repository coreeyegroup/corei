export interface ChannelContract {
  channel_id: string;

  channel_name: string;

  description: string;

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
}
