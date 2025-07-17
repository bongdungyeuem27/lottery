import type { ThemingConfig } from "@chakra-ui/react"

export const colors = {
  brand: {
    value: "#FFF4E2",
  },
  primary: {
    1: { value: "#FFEBEC" },
    2: { value: "#FF949C" },
    3: { value: "#FF626E" },
    4: { value: "#BD0F36" },
    5: { value: "#9C1237" },
    7: { value: "#221116" },
  },
  highlight: {
    value: "#EEEEEE",
  },
  border: {
    value: "#FFFFFF33",
  },
  accent: {
    blue: {
      value: "#0073EB",
    },
    rich: {
      value: "#000C1F",
    },
    cool: {
      value: "#00296B",
    },
    pink: {
      value: "#FF1D53",
    },
  },
  deep: {
    value: "#11141C",
  },
  foreground: {
    border: {
      value: "rgba(255, 255, 255, 0.15)",
    },
    value: {
      _light: "#1E1E1EFF",
      _dark: "#1E1E1EFF",
    },
  },

  neutral: {
    1: {
      value: {
        _light: "#FFFFFF",
        _dark: "#FFFFFF",
      },
    },
    2: {
      value: {
        _light: "#fafafa",
        _dark: "#fafafa",
      },
    },
    3: {
      value: {
        _light: "#E5E4E5",
        _dark: "#E5E4E5",
      },
    },
    4: {
      value: {
        _light: "#DEDEDE",
        _dark: "#DEDEDE",
      },
    },
    5: {
      value: {
        _light: "#8F8F8F",
        _dark: "#8F8F8F",
      },
    },
    6: {
      value: {
        _light: "#666666",
        _dark: "#666666",
      },
    },
    7: {
      value: {
        _light: "#3D3D3D",
        _dark: "#3D3D3D",
      },
    },
    8: {
      value: {
        _light: "#0A0A0A",
        _dark: "#0A0A0A",
      },
    },
  },

  mixed: {
    neutral: {
      value: "#FFFFFF97",
    },
    pink: {
      primary: {
        value: "#FF1D53",
      },
      secondary: {
        value: "#E7066FFF",
      },
    },
    orange: {
      primary: {
        value: "#F25D00",
      },
      secondary: {
        value: "#FF6200FF",
      },
    },
    red: {
      primary: {
        value: "#E53E3E",
      },
      secondary: {
        value: "#F11B1BFF",
      },
      tertiary: {
        value: "#fef2f2",
      },
    },
    green: {
      primary: {
        value: "#39A936",
      },
      secondary: {
        value: "#39A936FF",
      },
      tertiary: {
        value: "#f0fdf4",
      },
    },
    blue: {
      primary: {
        value: "#2087FC",
      },
      secondary: {
        value: "#0072EBFF",
      },
    },
    purple: {
      primary: {
        value: "#8831D6",
      },
      secondary: {
        value: "#71579CFF",
      },
      tertiary: {
        value: "#363453",
      },
    },
  },

  secondary: {
    3: {
      value: "#8160EB",
    },
  },
} satisfies Truthy<ThemingConfig["semanticTokens"]>["colors"]
