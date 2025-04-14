"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github, Document, Sun, Moon } from "./icons";

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <nav className="p-3 border-b border-outline">
            <div className={`flex items-center justify-between w-full max-w-7xl mx-auto`}>
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Image src="/logo.svg" alt="i8i" width={0} height={0} className="w-10" />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href={"/"} className="link">
                        Home
                    </Link>
                    <Link href={"/analytics"} className="link">
                        Analytics
                    </Link>
                    <hr className="h-6 border-l border-outline" />
                    <Link href={"https://github.com/An4s0/i8i"} target="_blank" aria-label="GitHub repository">
                        <Github className="icon" size={20} />
                    </Link>
                    <Link href={"https://ianas.me/posts/i8i"} target="_blank" aria-label="Project blog post">
                        <Document className="icon" size={20} />
                    </Link>
                    <hr className="h-6 border-l border-outline" />
                    <div className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <Sun className="icon" size={20} /> : <Moon className="icon" size={20} />}
                    </div>
                </div>
            </div>
        </nav>
    )
}