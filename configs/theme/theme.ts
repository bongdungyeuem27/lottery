import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { badgeRecipe } from "./Badge"
import { buttonRecipe } from "./Button"
import { cardSlotRecipe } from "./Card"
import { checkboxSlotRecipe } from "./Checkbox"
import { dialogSlotRecipe } from "./Dialog"
import { inputRecipe } from "./Input"
import { stepsSlotRecipe } from "./Steps"
import { tagSlotRecipe } from "./Tag"
import { toastSlotRecipe } from "./Toast"
import { colors } from "./colors"
import { textStyles } from "./typography"

const config = defineConfig({
  globalCss: {
    html: {
      backgroundColor: "neutral.2",
      overflow: "hidden",
      fontFamily: "default",
      textStyle: "1",
    },
    body: {
      scrollbarGutter: "stable",
      overflowY: "scroll",
      color: "neutral.7",
      maxHeight: "100dvh",
      "&.loaded": {
        "& .show-up": {
          animationTimingFunction: "ease-in-out",
          animationName: "show",
          animationDuration: "0.5s",
          animationFillMode: "both",
          willChange: "transform, opacity",
        },
        "& .fade-in": {
          transform: "translateZ(0)",
          animationTimingFunction: "ease-in-out",
          animationName: "fade-in",
          animationDuration: "0.5s",
          animationFillMode: "both",
          willChange: "transform, opacity",
        },
      },
    },
    "html, body": {
      margin: 0,
      padding: 0,
      "& *": {
        scrollbarWidth: "thin",
        scrollBehavior: "smooth",
      },
    },
  },
  theme: {
    textStyles: textStyles,
    breakpoints: {
      xs: "375px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1440px",
      xxl: "1600px",
      xxxl: "1800px",
    },
    tokens: {
      zIndex: {
        modal: {
          value: 800,
        },
      },
      fonts: {
        default: {
          value: "var(--font-inter)",
        },
        heading: {
          value: "var(--font-inter)",
        },
        body: {
          value: "var(--font-inter)",
        },
        inter: {
          value: "var(--font-inter)",
        },
      },
      sizes: {
        1: {
          value: "0.25rem",
        },
        2: {
          value: "0.5rem",
        },
        3: {
          value: "0.75rem",
        },
        4: {
          value: "1rem",
        },
        5: {
          value: "1.25rem",
        },
        6: {
          value: "1.5rem",
        },
        7: {
          value: "1.75rem",
        },
        8: {
          value: "2rem",
        },
      },
      radii: {
        1: {
          value: "0.25rem",
        },
        2: {
          value: "0.5rem",
        },
        3: {
          value: "0.75rem",
        },
        4: {
          value: "1rem",
        },
        5: {
          value: "1.25rem",
        },
        6: {
          value: "1.5rem",
        },
        7: {
          value: "1.75rem",
        },
        8: {
          value: "2rem",
        },
      },
    },

    recipes: {
      button: buttonRecipe,
      badge: badgeRecipe,
      input: inputRecipe,
    },
    slotRecipes: {
      steps: stepsSlotRecipe,
      checkbox: checkboxSlotRecipe,
      toast: toastSlotRecipe,
      dialog: dialogSlotRecipe,
      tag: tagSlotRecipe,
      card: cardSlotRecipe,
    },
    semanticTokens: {
      colors: colors,
      shadows: {
        primary: {
          value: "1px 2px 8px 0px rgba(0, 0, 0, 0.10)",
        },
        neutral: {
          value: "0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
        },
        mini: {
          value: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)",
        },
        title: {
          value: "-4px 4px 8px #1601015A",
        },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
      fillUp: {
        from: {
          top: "50%",
        },
        to: {
          top: "-75%",
        },
      },
      rotateWave: {
        from: {
          top: "75%",
          transform: "translate(-50%, -75%) rotate(0deg)",
        },
        to: {
          top: "-75%",
          transform: "translate(-50%, -75%) rotate(360deg)",
        },
      },
      show: {
        "0%": {
          opacity: 0,
          transform: "translateY(1rem)",
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    },
  },
})

export default createSystem(defaultConfig, config)
