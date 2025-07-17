import { defineSlotRecipe } from "@chakra-ui/react"
import { toastAnatomy } from "@chakra-ui/react/anatomy"

export const toastSlotRecipe = defineSlotRecipe({
  slots: toastAnatomy.keys(),
  className: "chakra-toast",
  base: {
    root: {
      display: "flex",
      alignItems: "stretch",
      flexDirection: "column",
      position: "unset !important",
      gap: 1,
      width: "21.4375rem",
      maxWidth: "calc(100vw - 2rem)",
      paddingY: 3,
      paddingLeft: 4,
      paddingRight: "3rem",
      borderRadius: 2,
      translate: "var(--x) var(--y)",
      scale: "var(--scale)",
      zIndex: "var(--z-index)",
      height: "var(--height)",
      opacity: "var(--opacity)",
      willChange: "translate, opacity, scale",
      transition:
        "translate 500ms, scale 500ms, opacity 500ms, height 500ms, box-shadow 200ms",
      transitionTimingFunction: "cubic-bezier(0.21, 1.02, 0.73, 1)",
      _closed: {
        transition: "translate 800ms, scale 800ms, opacity 200ms",
        transitionTimingFunction: "cubic-bezier(0.06, 0.71, 0.55, 1)",
      },
      bg: "bg.panel",
      color: "neutral.1",
      boxShadow: "xl",

      "&[data-type=warning]": {
        bg: "orange.solid",

        "--toast-trigger-bg": "{white/10}",
      },
      "&[data-type=success]": {
        bg: "green.solid",
      },
      "&[data-type=error]": {
        bg: "red.solid",
      },
    },
    title: {
      textStyle: "1600",
      color: "neutral.1",
      marginInlineEnd: "unset",
    },
    description: {
      textStyle: "1",
      opacity: 1,
      color: "neutral.1",
    },
    indicator: {
      flexShrink: "0",
      boxSize: "5",
    },
    actionTrigger: {
      textStyle: "sm",
      fontWeight: "medium",
      height: "8",
      px: "3",
      borderRadius: "l2",
      alignSelf: "center",
      borderWidth: "1px",
      borderColor: "var(--toast-border-color, inherit)",
      transition: "background 200ms",
      _hover: {
        bg: "var(--toast-trigger-bg)",
      },
    },
    closeTrigger: {
      top: 3,
      right: 3,
      boxSize: 5,
      transition: "background 200ms",
      color: "neutral.1",
      padding: 0,
      cursor: "pointer",
    },
  },
})
