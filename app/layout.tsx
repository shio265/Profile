import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import localFont from "next/font/local"

const ProximaSoft = localFont({
  src: [
    {
      path: '../public/fonts/ProximaSoft.woff2',
      weight: '400',
      style: 'soft',
    }
  ]
});

export const metadata: Metadata = {
  title: "Shiori Profile",
  description: "A software engineer from Vietnam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ProximaSoft.className} suppressHydrationWarning>
      <head />
      <body className={`${ProximaSoft.className} `}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
