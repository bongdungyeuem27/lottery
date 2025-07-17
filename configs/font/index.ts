import { Inter, Open_Sans, Rubik } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// const ibmPlexSans = IBM_Plex_Sans({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["600"],
//   variable: "--font-ibm-plex-sans",
// });

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
})

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})
