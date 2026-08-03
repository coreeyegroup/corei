export const shadows = {
  none: "none",

  subtle: "0 0 0 1px rgba(255,255,255,0.03)"
} as const;

export type Shadows = typeof shadows;
