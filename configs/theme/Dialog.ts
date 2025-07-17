import { defineSlotRecipe } from "@chakra-ui/react"
import { dialogAnatomy } from "@chakra-ui/react/anatomy"

export const dialogSlotRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  className: "chakra-dialog",
  base: {
    backdrop: {
      bg: "blackAlpha.500",
      pos: "fixed",
      left: 0,
      top: 0,
      w: "100vw",
      h: "100dvh",
      zIndex: "modal",
      _open: {
        animationName: "fade-in",
        animationDuration: "slow",
      },
      _closed: {
        animationName: "fade-out",
        animationDuration: "moderate",
      },
    },
    positioner: {
      display: "flex",
      width: "100vw",
      height: "100dvh",
      position: "fixed",
      left: 0,
      top: 0,
      "--dialog-z-index": "zIndex.modal",
      zIndex: "calc(var(--dialog-z-index) + var(--layer-index, 0))",
      justifyContent: "center",
      overscrollBehaviorY: "none",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      borderRadius: "l3",
      textStyle: "sm",
      my: "var(--dialog-margin, var(--dialog-base-margin))",
      "--dialog-z-index": "zIndex.modal",
      zIndex: "calc(var(--dialog-z-index) + var(--layer-index, 0))",
      bg: "bg.panel",
      boxShadow: "lg",
      _open: {
        animationDuration: "moderate",
      },
      _closed: {
        animationDuration: "faster",
      },
    },
    header: {
      flex: 0,
      px: "6",
      pt: "6",
      pb: "4",
    },
    body: {
      flex: "1",
      px: "6",
      pt: "2",
      pb: "6",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "3",
      px: "6",
      pt: "2",
      pb: "4",
    },
    title: {
      textStyle: "lg",
      fontWeight: "semibold",
    },
    description: {
      color: "fg.muted",
    },
  },

  variants: {
    placement: {
      center: {
        positioner: {
          alignItems: "center",
        },
        content: {
          "--dialog-base-margin": "auto",
          mx: "auto",
        },
      },
      top: {
        positioner: {
          alignItems: "flex-start",
        },
        content: {
          "--dialog-base-margin": "spacing.16",
          mx: "auto",
        },
      },
      bottom: {
        positioner: {
          alignItems: "flex-end",
        },
        content: {
          "--dialog-base-margin": "spacing.16",
          mx: "auto",
        },
      },
    },

    scrollBehavior: {
      inside: {
        positioner: {
          overflow: "hidden",
        },
        content: {
          maxH: "calc(100% - 7.5rem)",
        },
        body: {
          overflow: "auto",
        },
      },
      outside: {
        positioner: {
          overflow: "auto",
          pointerEvents: "auto",
        },
      },
    },

    size: {
      xs: {
        content: {
          maxW: "sm",
        },
      },
      sm: {
        content: {
          maxW: "md",
        },
      },
      md: {
        content: {
          maxW: "lg",
        },
      },
      lg: {
        content: {
          maxW: "xxl",
        },
      },
      xl: {
        content: {
          maxW: "4xl",
        },
      },
      cover: {
        positioner: {
          padding: "10",
        },
        content: {
          width: "100%",
          height: "100%",
          "--dialog-margin": "0",
        },
      },
      full: {
        content: {
          maxW: "100vw",
          minH: "100vh",
          "--dialog-margin": "0",
          borderRadius: "0",
        },
      },
    },

    motionPreset: {
      scale: {
        content: {
          _open: { animationName: "scale-in, fade-in" },
          _closed: { animationName: "scale-out, fade-out" },
        },
      },
      "slide-in-bottom": {
        content: {
          _open: { animationName: "slide-from-bottom, fade-in" },
          _closed: { animationName: "slide-to-bottom, fade-out" },
        },
      },
      "slide-in-top": {
        content: {
          _open: { animationName: "slide-from-top, fade-in" },
          _closed: { animationName: "slide-to-top, fade-out" },
        },
      },
      "slide-in-left": {
        content: {
          _open: { animationName: "slide-from-left, fade-in" },
          _closed: { animationName: "slide-to-left, fade-out" },
        },
      },
      "slide-in-right": {
        content: {
          _open: { animationName: "slide-from-right, fade-in" },
          _closed: { animationName: "slide-to-right, fade-out" },
        },
      },
      none: {},
    },
    variant: {
      toast: {
        backdrop: {
          //   bg: "modal",
        },
        content: {
          backgroundColor: "foreground",
          textStyle: "1600",
          padding: "1.5rem",
          minHeight: "18.25rem",
          width: "27.4375rem",
          maxWidth: "calc(100vw - 2rem)",
          borderRadius: "0.75rem",
          borderWidth: 1,
          borderColor: "foreground.border",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "1.5rem",
          color: "neutral.1",
          justifyContent: "center",
        },
        title: {
          color: "neutral.1",
          textStyle: "1600",
          textAlign: "center",
        },
        body: {
          flex: 0,
          padding: 0,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
          _empty: { display: "none" },
        },
        description: {
          color: "neutral.1",
          textAlign: "center",
          textStyle: "1",
          _empty: { display: "none" },
        },
        footer: {
          _empty: { display: "none" },
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          height: "2.75rem",
          margin: 0,
          padding: 0,
          textAlign: "center",
          textStyle: "1",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    scrollBehavior: "outside",
    placement: "top",
    motionPreset: "scale",
  },
})
