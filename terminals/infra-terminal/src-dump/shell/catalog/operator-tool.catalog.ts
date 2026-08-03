import type {
  OperatorToolContract
}
from "../contracts/operator-tool.contract";

export const operatorToolCatalog:
OperatorToolContract[] = [

  {
    tool_id: "terminal",
    title: "Terminal",
    icon: "⌘"
  },

  {
    tool_id: "logs",
    title: "Logs",
    icon: "☰"
  },

  {
    tool_id: "metrics",
    title: "Metrics",
    icon: "◍"
  },

  {
    tool_id: "alerts",
    title: "Alerts",
    icon: "⚠"
  },

  {
    tool_id: "audit",
    title: "Audit",
    icon: "✓"
  }
];
