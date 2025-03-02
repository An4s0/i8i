import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "i8i",
  description: "i8i is a URL shortener offering custom links, analytics, passwords, QR codes, and an API for seamless integration. 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
