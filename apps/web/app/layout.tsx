import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import Header from "@/components/header";
import MainLayout from "@/components/mainLayout";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
    title: "i8i - URL Shortener",
    description: "i8i is a URL shortener offering custom links, analytics, passwords, QR codes, and an API for seamless integration.",
    openGraph: {
        title: "i8i - URL Shortener",
        description: "i8i is a URL shortener offering custom links, analytics, passwords, QR codes, and an API for seamless integration.",
        type: "website",
        url: "https://i8i.pw/",
        images: [{ url: "https://i8i.pw/logo.svg" }],
    },
    twitter: {
        card: "summary_large_image",
        site: "@AnasAlmutary",
        title: "i8i - URL Shortener",
        description: "i8i is a URL shortener offering custom links, analytics, passwords, QR codes, and an API for seamless integration.",
    },
    robots: "index, follow",
    keywords: "url shortener, link shortener, custom links, analytics, passwords, qr codes, api, i8i",
    authors: [{
        name: "Anas Almutary",
        url: "https://ianas.me",
    }]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head> */}
            <body>
                <Analytics />
                <ThemeProvider>
                    <MainLayout>
                        <Header />
                        {children}
                    </MainLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}