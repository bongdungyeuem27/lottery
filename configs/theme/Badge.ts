import { defineRecipe } from "@chakra-ui/react"

export const badgeRecipe = defineRecipe({
  className: "chakra-badge",
  base: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "l2",
    gap: "1",
    fontWeight: "normal",
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
    cursor: "text",
  },
  variants: {
    variant: {
      solid: {
        bg: "colorPalette.solid",
        color: "colorPalette.contrast",
      },
      subtle: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
      },
      outline: {
        color: "colorPalette.fg",
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
        shadowColor: "colorPalette.muted",
      },
      surface: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
        shadow: "inset 0 0 0px 1px var(--shadow-color)",
        shadowColor: "colorPalette.muted",
      },
      plain: {
        color: "colorPalette.fg",
      },
      blur: {
        position: "relative",
        bg: "rgba(255, 255, 255, 0.1)",
        color: "colorPalette.fg",
        boxShadow: "sm",
        backdropFilter: "blur(8px)",
        filter: "brightness(1)",
        transition: "all 0.3s ease",
        borderColor: "neutral.3",
        borderWidth: 1,
      },
    },
    size: {
      xs: {
        textStyle: "2xs",
        px: "1",
        minH: "4",
      },
      sm: {
        textStyle: "xs",
        px: "1.5",
        minH: "5",
      },
      md: {
        textStyle: "sm",
        px: "2",
        minH: "6",
      },
      lg: {
        textStyle: "lg",
        h: "8",
        minW: "12",
        px: "3",
      },
      xl: {
        h: "12",
        minW: "12",
        textStyle: "md",
        px: "5",
        gap: "2.5",
        _icon: {
          width: "5",
          height: "5",
        },
      },
      xxl: {
        h: "5rem",
        minW: "15rem",
        textStyle: "lg",
        px: "7",
        gap: "3",
        _icon: {
          width: "6",
          height: "6",
        },
      },
      xxxl: {
        h: "6rem",
        minW: "15rem",
        textStyle: "xl",
      },
    },
  },
  compoundVariants: [
    {
      colorPalette: "pink",
      variant: "solid",
      css: {
        bg: "mixed.pink.primary",
        color: "neutral.1",
      },
    },
    {
      colorPalette: "orange",
      variant: "solid",
      css: {
        bg: "mixed.orange.primary",
        color: "neutral.1",
      },
    },
    {
      colorPalette: "blue",
      variant: "solid",
      css: {
        bg: "mixed.blue.primary",
        color: "neutral.1",
      },
    },
    {
      colorPalette: "green",
      variant: "solid",
      css: {
        bg: "mixed.green.primary",
        color: "neutral.1",
      },
    },
    {
      colorPalette: "pink",
      variant: "subtle",
      css: {
        bg: "mixed.pink.primary",
        color: "neutral.1",
      },
    },
    {
      colorPalette: "orange",
      variant: "subtle",
      css: {
        bg: "mixed.orange.primary",
        color: "neutral.1",
      },
    },
    {
      colorPalette: "blue",
      variant: "subtle",
      css: {
        bg: "mixed.blue.primary",
        color: "neutral.1",
      },
    },
    {
      colorPalette: "green",
      variant: "subtle",
      css: {
        bg: "mixed.green.primary",
        color: "neutral.1",
      },
    },
  ],
  defaultVariants: {
    variant: "subtle",
    size: "sm",
  },
})
