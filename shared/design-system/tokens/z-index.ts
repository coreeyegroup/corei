export const zIndex = {
  base: 1,
  panel: 100,
  navigation: 200,
  modal: 1000,
  commandPalette: 2000
} as const;

export type ZIndex = typeof zIndex;
