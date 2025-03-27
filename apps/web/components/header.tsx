"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { SiGoogledocs, SiGithub } from "react-icons/si";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <nav className="p-4 border-b border-hr">
            <div className={`flex items-center justify-between w-full max-w-7xl mx-auto`}>
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Image src="/logo.svg" alt="i8i" width={0} height={0} className="w-11" />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">

                    <Link href={"/"} className="links">
                        Home
                    </Link>
                    <Link href={"/analytics"} className="links">
                        Analytics
                    </Link>
                    <Link href={"/docs"} className="links">
                        Docs
                    </Link>
                    <hr className="h-6 border-l border-hr" />
                    <Link href={"https://github.com/An4s0/i8i"} className="links" target="_blank" aria-label="GitHub repository">
                        <SiGithub size={20} />
                    </Link>
                    <Link href={"https://ianas.me/posts/i8i"} className="links" target="_blank" aria-label="Project blog post">
                        <SiGoogledocs size={20} />
                    </Link>
                    <hr className="h-6 border-l border-hr" />
                    <div className="cursor-pointer links" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </div>
                </div>
            </div>
        </nav>
    );
}