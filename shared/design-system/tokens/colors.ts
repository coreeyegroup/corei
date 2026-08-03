export const colors = {
  raw: {
    black950: "#050506",
    black900: "#0A0B0D",
    black850: "#101216",
    black800: "#141821",

    gold700: "#8A6A1D",
    gold600: "#A37C21",
    gold500: "#C89A2B",
    gold400: "#DDB44B",

    green500: "#16A34A",
    yellow500: "#EAB308",
    red500: "#DC2626",
    blue500: "#2563EB"
  },

  semantic: {
    surfacePrimary: "surface-primary",
    surfaceSecondary: "surface-secondary",
    surfaceTertiary: "surface-tertiary",

    textPrimary: "text-primary",
    textSecondary: "text-secondary",
    textMuted: "text-muted",

    borderPrimary: "border-primary",
    borderSecondary: "border-secondary",

    statusSuccess: "status-success",
    statusWarning: "status-warning",
    statusDanger: "status-danger",
    statusInfo: "status-info"
  },

  component: {
    terminalBackground: "terminal-background",
    workspaceBackground: "workspace-background",
    panelBackground: "panel-background",
    navigationBackground: "navigation-background",
    toolbarBackground: "toolbar-background",

    alertCritical: "alert-critical",
    alertWarning: "alert-warning",
    alertInfo: "alert-info"
  }
} as const;

export type Colors = typeof colors;
