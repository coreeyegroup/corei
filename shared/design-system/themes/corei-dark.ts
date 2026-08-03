export const coreiDarkTheme = {
  "surface-primary": "#050506",
  "surface-secondary": "#0A0B0D",
  "surface-tertiary": "#141821",

  "text-primary": "#C7CDD6",
  "text-secondary": "#9AA4B2",
  "text-muted": "#6B7280",

  "border-primary": "#1F2937",
  "border-secondary": "#374151",

  "status-success": "#16A34A",
  "status-warning": "#EAB308",
  "status-danger": "#DC2626",
  "status-info": "#2563EB",

  "terminal-background": "#050506",
  "workspace-background": "#0A0B0D",
  "panel-background": "#141821",
  "navigation-background": "#0A0B0D",
  "toolbar-background": "#101216",

  "alert-critical": "#DC2626",
  "alert-warning": "#EAB308",
  "alert-info": "#2563EB"
} as const;

export type CoreiDarkTheme = typeof coreiDarkTheme;
