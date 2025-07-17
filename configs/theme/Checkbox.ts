import { defineSlotRecipe } from "@chakra-ui/react"
import { checkboxAnatomy } from "@chakra-ui/react/anatomy"

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  className: "chakra-checkbox",
  base: {
    control: {
      cursor: "pointer",
      borderRadius: "0.25rem",
      borderWidth: "1.5px",
      borderColor: "neutral.1",
      transition: "all 0.2s ease-in-out",
    },
    label: {
      cursor: "pointer",
    },
  },
  //   variants: {
  //     variant: {
  //       solid: {
  //         control: {},
  //       },
  //     },
  //   },
  compoundVariants: [
    {
      colorPalette: "primary",
      variant: "solid",
      css: {
        control: {
          borderColor: "neutral.1",
          color: "neutral.1",
          _checked: {
            borderColor: "primary",
            backgroundColor: "primary",
            color: "neutral.1",
          },
        },
        // _expanded: {
        // bg: "colorPalette.primary/90",
        // },
      },
    },
    {
      colorPalette: "purple",
      variant: "solid",
      css: {
        control: {
          borderColor: "mixed.purple.tertiary",
          color: "mixed.purple.primary",
          _checked: {
            borderColor: "mixed.purple.primary",
            backgroundColor: "mixed.purple.primary",
            color: "neutral.1",
          },
          _disabled: {
            borderColor: "mixed.purple.tertiary",
            backgroundColor: "mixed.purple.tertiary",
            color: "mixed.purple.primary",
          },
        },
        // _expanded: {
        // bg: "colorPalette.primary/90",
        // },
      },
    },
  ],
})
