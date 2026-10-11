import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Preloader } from "@/components/preloader";
import { site } from "@/lib/content";

const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  // Regular is used for every weight, so the whole site renders in Satoshi Regular.
  src: [{ path: "../public/fonts/Satoshi-Regular.otf", weight: "100 900", style: "normal" }],
});

export const metadata: Metadata = {
  title: `${site.name} | Software Engineer`,
  description: "Software Engineer Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
