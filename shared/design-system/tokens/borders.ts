export const borders = {
  thin: "1px",
  normal: "2px",
  thick: "3px"
} as const;

export type Borders = typeof borders;
