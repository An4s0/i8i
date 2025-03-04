import Image from "next/image";
import Link from "next/link";
import { SiGoogledocs, SiGithub, SiNpm } from "react-icons/si";

export default function Navbar() {

    return (
        <nav className="p-4 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
                <Link href="/">
                    <Image src="/logo.svg" alt="i8i" width={0} height={0} className="w-11" />
                </Link>
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
                    <hr className="h-6 border-l border-zinc-800" />
                    <Link href={"https://github.com/An4s0/i8i"} className="social">
                        <SiGithub size={20} />
                    </Link>
                    <Link href={"https://ianas.me/posts/i8i"} className="social">
                        <SiGoogledocs size={20} />
                    </Link>
                    <hr className="h-6 border-l border-zinc-800" />
                    <Link href={"https://www.npmjs.com/package/i8i"} className="social">
                        <SiNpm size={20} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}