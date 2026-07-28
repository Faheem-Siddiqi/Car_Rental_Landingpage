import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./typography.css";
const manrope = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
  fallback: ["system-ui", "sans-serif"],
});
export const metadata:Metadata={title:"Moveit Cars — Premium Car Rental & Transport Across Pakistan",description:"Islamabad's #1 rated car rental. Police-verified drivers, modern fleet, airport transfers, corporate travel & weddings."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={manrope.variable}>{children}</body></html>}
