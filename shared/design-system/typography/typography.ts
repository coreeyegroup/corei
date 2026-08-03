export const typography = {
  fontFamily: {
    primary: "Inter",
    monospace: "JetBrains Mono"
  },

  roles: {
    display: {
      size: 18,
      weight: 700
    },

    heading: {
      size: 14,
      weight: 600
    },

    title: {
      size: 13,
      weight: 600
    },

    body: {
      size: 11,
      weight: 400
    },

    label: {
      size: 10,
      weight: 500
    },

    data: {
      size: 11,
      weight: 500
    },

    code: {
      size: 11,
      weight: 400
    }
  }
} as const;

export type Typography = typeof typography;
