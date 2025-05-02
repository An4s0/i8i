import type { Metadata } from "next";
import AppProvider from "./provider";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
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
  robots: "index, follow",
  openGraph: {
    title: "i8i - URL Shortener",
    description:
      "An open-source, powerful, and simple URL shortener with analytics, password protection, and expiration settings.",
    url: "https://i8i.pw/",
    type: "website",
    siteName: "i8i",
    images: [
      {
        url: "https://i8i.pw/logo.svg",
        width: 800,
        height: 800,
      },
    ],
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
