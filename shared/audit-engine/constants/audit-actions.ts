export const AUDIT_ACTIONS = {
  LOGIN: "login",

  LOGOUT: "logout",

  VIEW: "view",

  CREATE: "create",

  UPDATE: "update",

  DELETE: "delete",

  APPROVE: "approve",

  EXECUTE: "execute",

  ROLLBACK: "rollback",

  GOVERNANCE_APPROVE: "governance_approve",

  GOVERNANCE_REJECT: "governance_reject",

  INCIDENT_ACKNOWLEDGE: "incident_acknowledge",

  INCIDENT_RESOLVE: "incident_resolve",

  REPLAY_START: "replay_start",

  REPLAY_PAUSE: "replay_pause",

  REPLAY_RESUME: "replay_resume",

  REPLAY_STOP: "replay_stop"
} as const;
