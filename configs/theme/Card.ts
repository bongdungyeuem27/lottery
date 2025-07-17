import { defineSlotRecipe } from "@chakra-ui/react"
import { cardAnatomy } from "@chakra-ui/react/anatomy"

export const cardSlotRecipe = defineSlotRecipe({
  className: "chakra-card",
  slots: cardAnatomy.keys(),
  base: {
    root: {
      cursor: "pointer",
      transitionProperty: "transform",
      transitionDuration: "0.2s",
      transitionTimingFunction: "ease-in-out",
      willChange: "transform",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: "0",
      wordWrap: "break-word",
      borderRadius: "l3",
      color: "fg",
      textAlign: "start",
    },
    title: {
      fontWeight: "semibold",
    },
    description: {},
    header: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
    },
    body: {
      padding: "var(--card-padding)",
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      paddingInline: "var(--card-padding)",
      paddingBottom: "var(--card-padding)",
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          "--card-padding": "spacing.4",
        },
        title: {
          textStyle: "md",
        },
      },
      md: {
        root: {
          "--card-padding": "spacing.6",
        },
        title: {
          textStyle: "lg",
        },
      },
      lg: {
        root: {
          "--card-padding": "spacing.7",
        },
        title: {
          textStyle: "xl",
        },
      },
      xl: {
        root: {
          paddingY: "2.5rem",
          gap: "3.12rem",
        },
        title: {
          textStyle: "225600",
        },
      },
    },

    variant: {
      promotion: {
        root: {
          transform: "translateZ(0)",
          paddingY: "1.25rem",
          paddingX: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          overflow: "hidden",
          justifyContent: "space-between",
          flex: 1,
          gap: 2,
          borderRadius: "0.25rem",
          color: "highlight",
          textAlign: "center",
          backgroundColor: "accent.cool",
          boxShadow: "elevated",
        },
        header: {
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          boxSize: "3rem",
          aspectRatio: 1,
          padding: 0,
          flexShrink: 0,
          _empty: {
            display: "none",
          },
        },
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          flex: 1,
          overflow: "hidden",
        },
        title: {
          textStyle: "1125",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "highlight",
        },
        description: {
          textStyle: "1",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "highlight",
        },
        footer: {
          justifyContent: "center",
          _empty: {
            display: "none",
          },
        },
      },
      feature: {
        root: {
          paddingY: "1.25rem",
          paddingX: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignContent: "stretch",
          overflow: "hidden",
          justifyContent: "space-between",
          flex: 1,
          gap: "0.5rem",
          borderRadius: "0.25rem",
          borderWidth: "1px",
          borderColor: "#FFFFFF33",
          color: "highlight",
          transform: "scale(1)",
          _hover: {
            transform: "translateZ(0), scale(1.02)",
          },
        },
        header: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          boxSize: "3rem",
          aspectRatio: 1,
          padding: 0,
          flexShrink: 0,
          _empty: {
            display: "none",
          },
        },
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "0.25rem",
          flex: 1,
        },
        title: {
          textStyle: "1125",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "highlight",
        },
        description: {
          textStyle: "1",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "highlight",
        },
        footer: {
          justifyContent: "center",
        },
      },
      blur: {
        root: {
          borderRadius: 2, // Set border radius
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderWidth: "1px",
          borderColor: "#FFFFFF33",
          color: "highlight",
          bg: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px)",
          boxShadow: "primary",
          padding: 3,
        },
        header: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 0,
          textStyle: "1500",
          color: "neutral.1",
          flexShrink: 0,
          _empty: {
            display: "none",
          },
        },
        body: {
          paddingTop: 2,
          borderTopWidth: 1,
          borderColor: "neutral.7",
          padding: 0,
          color: "neutral.1",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "0.25rem",
          flex: 1,
        },
        title: {
          textStyle: "1125",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "highlight",
        },
        description: {
          textStyle: "1",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "neutral.3",
        },
        footer: {
          justifyContent: "center",
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: "blur",
      colorPalette: "highlight",
      css: {
        root: {
          bg: "neutral.2",
          color: "neutral.7",
          borderColor: "neutral.2",
        },
        body: {
          borderColor: "neutral.3",
          color: "neutral.7",
        },
        title: {
          color: "neutral.7",
        },
        header: {
          color: "neutral.7",
        },
        description: {
          color: "neutral.7",
        },
        footer: {
          color: "neutral.7",
        },
      },
    },
  ],
  defaultVariants: {
    variant: "promotion",
  },
})
