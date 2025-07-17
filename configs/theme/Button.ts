import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  className: "chakra-button",
  base: {
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    position: "relative",
    borderRadius: "l2",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    borderWidth: "1px",
    borderColor: "transparent",
    cursor: "button",
    flexShrink: "0",
    outline: "0",
    lineHeight: "1.2",
    isolation: "isolate",
    fontWeight: "medium",
    transitionProperty: "all",
    transitionDuration: "moderate",
    transitionTimingFunction: "ease-in-out",
    focusVisibleRing: "outside",
    transform: "scale(1) translateZ(0)",
    transition:
      "transform 0.2s ease-in-out, color 1s ease-out, background-color 1ss ease-out",
    _hover: {
      transform: "scale(1.04) translateZ(0)",
      _active: {
        transform: "scale(0.96) translateZ(0)",
      },
    },
    _disabled: {
      layerStyle: "disabled",
      cursor: "default",
    },
    _loading: {},
    _icon: {
      flexShrink: "0",
    },
  },

  variants: {
    size: {
      "2xs": {
        h: "6",
        minW: "6",
        textStyle: "xs",
        px: "2",
        gap: "1",
        _icon: {
          width: "3.5",
          height: "3.5",
        },
      },
      xs: {
        h: "8",
        minW: "8",
        textStyle: "xs",
        gap: "1",
        _icon: {
          width: "4",
          height: "4",
        },
      },
      sm: {
        h: "9",
        minW: "9",
        px: "3.5",
        textStyle: "sm",
        gap: "2",
        _icon: {
          width: "4",
          height: "4",
        },
      },
      md: {
        h: "10",
        minW: "10",
        textStyle: "sm",
        px: "4",
        gap: "2",
        _icon: {
          width: "5",
          height: "5",
        },
      },
      lg: {
        h: "11",
        minW: "11",
        textStyle: "md",
        px: "5",
        gap: "3",
        _icon: {
          width: "5",
          height: "5",
        },
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

    variant: {
      solid: {
        bg: "colorPalette.primary",
        color: "colorPalette.primary",
        _hover: {
          bg: "colorPalette.primary/90",
        },
        _expanded: {
          bg: "colorPalette.primary/90",
        },
      },

      subtle: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
        _hover: {
          bg: "colorPalette.muted",
        },
        _expanded: {
          bg: "colorPalette.muted",
        },
      },

      surface: {
        bg: "colorPalette.subtle",
        color: "colorPalette.fg",
        shadow: "0 0 0px 1px var(--shadow-color)",
        shadowColor: "colorPalette.muted",
        _hover: {
          bg: "colorPalette.muted",
        },
        _expanded: {
          bg: "colorPalette.muted",
        },
      },

      outline: {
        borderWidth: "1px",
        borderColor: "colorPalette.muted",
        color: "colorPalette.fg",
        _hover: {
          bg: "colorPalette.subtle",
        },
        _expanded: {
          bg: "colorPalette.subtle",
        },
      },

      ghost: {
        color: "colorPalette.fg",
        _hover: {
          bg: "colorPalette.subtle",
        },
        _expanded: {
          bg: "colorPalette.subtle",
        },
      },

      plain: {
        color: "colorPalette.fg",
      },

      blur: {
        position: "relative",
        color: "colorPalette.fg",
        boxShadow: "sm",
        bg: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        filter: "brightness(1)",
        transition: "all 0.3s ease",
        _hover: {
          backdropFilter: "blur(12px)",
          bg: "rgba(255, 255, 255, 0.2)",
          filter: "brightness(1.2)",
        },
      },
      "blur-outline": {
        position: "relative",
        bg: "rgba(255, 255, 255, 0.1)",
        color: "colorPalette.fg",
        boxShadow: "sm",
        backdropFilter: "blur(8px)",
        filter: "brightness(1)",
        transition: "all 0.3s ease",
        borderColor: "neutral.3",
        borderWidth: 1,
        _hover: {
          backdropFilter: "blur(12px)",
          bg: "rgba(255, 255, 255, 0.2)",
          filter: "brightness(1.2)",
        },
      },
    },
  },

  compoundVariants: [
    {
      colorPalette: "primary",
      variant: "solid",
      css: {
        bg: "primary",
        color: "neutral.7",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0px 0px 7px 0px #4d1c1ce0",
        transform: "scale(1) translateZ(0)",
        transition:
          "transform 0.2s ease-in-out, color 1s ease-out, background-color 1ss ease-out",
        _hover: {
          bg: "secondary",
          color: "primary",
          transform: "scale(1.04) translateZ(0)",
          _active: {
            transform: "scale(0.96) translateZ(0)",
          },
          _before: {
            top: "-1%",
            transform: "translate(-50%, 0%) rotate(300deg)",
          },
          _after: {
            top: "-1%",
            transform: "translate(-50%, 0%) rotate(180deg)",
          },
        },

        "& > *": {
          zIndex: 1,
        },
        "&[data-nofloat]": {
          _before: {
            display: "none",
          },
          _after: {
            display: "none",
          },
        },
        _before: {
          content: '""',
          position: "absolute",
          w: "280%",
          h: "720%",
          top: "100%",
          zIndex: -1,
          left: "50%",
          transform: "translate(-50%, 0%) rotate(0deg)",
          bg: "highlight",
          borderRadius: "45%",

          transitionProperty: "top, transform",
          transitionDuration: "1.15s",
          transitionTimingFunction: "cubic-bezier(.6, .8, .8, .9)",
        },
        // .wave:after
        _after: {
          content: '""',
          position: "absolute",
          w: "280%",
          h: "720%",
          top: "100%",
          zIndex: -1,
          left: "50%",
          transform: "translate(-50%, 0%) rotate(0deg)",
          bg: "highlight",
          borderRadius: "40%",
          transitionProperty: "top, transform",
          transitionDuration: "1.15s",
          transitionTimingFunction: "cubic-bezier(.6, .8, .8, .9)",
        },
      },
    },
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
      colorPalette: "purple",
      variant: "solid",
      css: {
        bg: "mixed.purple.primary",
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
    {
      colorPalette: "purple",
      variant: "subtle",
      css: {
        bg: "mixed.purple.primary",
      },
    },
  ],

  defaultVariants: {
    size: "md",
    variant: "solid",
  },
})
