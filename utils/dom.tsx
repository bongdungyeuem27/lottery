"use client"

import { castArray } from "lodash"
import type React from "react"
import type { ChangeEvent, ForwardedRef, JSX, RefObject } from "react"
import ReactDOMServer from "react-dom/server"
import delay from "./delay"

export const isEmptyElement = (element: JSX.Element | any) => {
  if (!element) return true
  if (Array.isArray(element)) return element.every(isEmptyElement)
  return castArray(element?.props?.children).filter(Boolean).length === 0
}

export async function smoothScroll(
  value: HTMLElement | string | "top" | null | undefined,
  offset = 0,
  options?: { delay?: number },
) {
  if (options?.delay) await delay(options.delay)
  const elem =
    typeof value === "string" ? document.getElementById(value) : value
  if (!elem) return
  const rect = elem.getBoundingClientRect() // Get the bounding box of the element
  const currentScroll = document.body.scrollTop
  const targetPosition = rect.top + currentScroll + (offset || 0) // Calculate the target position

  document.body.scrollTo({
    top: targetPosition, // Scroll to the target position
    behavior: "smooth", // Use smooth scrolling
  })

  return new Promise<void>((resolve, reject) => {
    const failed = setTimeout(() => {
      reject()
    }, 2000)

    const scrollHandler = () => {
      if (self.pageYOffset === targetPosition) {
        document.body.removeEventListener("scroll", scrollHandler)
        clearTimeout(failed)
        resolve()
      }
    }
    if (self.pageYOffset === targetPosition) {
      clearTimeout(failed)
      resolve()
    } else {
      document.body.addEventListener("scroll", scrollHandler)
      elem.getBoundingClientRect()
    }
  })
}

export const newOnChangeEvent = <T extends HTMLInputElement = HTMLInputElement>(
  value: any,
) => {
  // Create a new input event
  const event = new InputEvent("input", {
    bubbles: true, // Event bubbles up through the DOM
    cancelable: true, // Event can be canceled
  })

  // Set the value property of the event
  Object.defineProperty(event, "target", {
    writable: true,
    enumerable: true,
    configurable: true,
    value: {
      value: value,
    }, // Set your desired value here
  })
  return event as unknown as ChangeEvent<T>
}

export const multipleRef = <T,>(
  node: T | null,
  ...refs: (RefObject<T | null> | ForwardedRef<T | null> | undefined)[]
) => {
  refs.forEach((ref) => {
    if (typeof ref === "function") {
      ref?.(node)
    } else if (ref) {
      ref.current = node
    }
  })
}

export const cleanRef = (
  ...refs: (
    | RefObject<any | null>
    | ForwardedRef<any | null>
    | undefined
    | null
  )[]
) => {
  refs.forEach((ref) => {
    if (typeof ref === "function") {
      ref?.(null)
    } else if (ref) {
      ref.current = null
    }
  })
}

export function hideKeyboard() {
  ;(document.body as any)?.blur?.()
}

// Helper function to convert a string to a DOM element
function stringToDOMElement(str: string) {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = str
  return tempDiv.firstChild!
}

// Function to convert a React component to a DOM element
export function componentToDOMElement<T = HTMLElement>(
  Component: React.ComponentType,
) {
  // Render the component to a string
  const componentString = ReactDOMServer.renderToString(<Component />)

  // Convert the rendered string to a DOM element
  const domElement = stringToDOMElement(componentString)

  return domElement as T
}

export function svgToImage(svgString: string) {
  const svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(svg)
  const img = new Image()
  img.src = url
  return img
}
