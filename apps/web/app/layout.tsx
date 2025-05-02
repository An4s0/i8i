import type { Metadata } from "next";
import AppProvider from "./provider";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: "i8i - URL Shortener",
  description:
    "An open-source, powerful, and simple URL shortener with analytics, password protection, and expiration settings.",
  keywords:
    "URL shortener, link shortening, URL analytics, password protection, URL expiration, open source URL shortener",
  authors: [
    {
      name: "Anas Almutary",
      url: "https://ianas.me",
    },
  ],
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
