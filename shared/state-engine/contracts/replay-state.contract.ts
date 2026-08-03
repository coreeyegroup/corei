export interface ReplayStateContract {
  mode:
    | "live"
    | "paper"
    | "simulation"
    | "replay";

  status:
    | "running"
    | "paused"
    | "stopped";

  event_time: string;

  source: string | null;

  updated_at: string;
}
