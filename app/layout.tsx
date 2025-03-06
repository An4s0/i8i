import type { Metadata } from "next";
import "./globals.css";

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
        site: "@i8i_pw",
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
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}