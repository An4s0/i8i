'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import shorten from "@/utils/shorten";
import { TbError404 } from "react-icons/tb";
import { CgSearchLoading } from "react-icons/cg";

export default function page() {
    const pathname = usePathname();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const getURL = async () => {
            const res = await shorten.get(pathname.slice(1));
            if (res.url) window.location.href = res.url;
            else setNotFound(true);
        }
        if (pathname) getURL();
        getURL();
    }, [pathname]);

    return (
        <>
            {notFound ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
                    <TbError404 className="text-zinc-700" size={150} />
                    <span className="font-bold text-2xl">Page Not Found</span>
                    <p className="text-zinc-500">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
                    <CgSearchLoading className="text-zinc-700" size={150} />
                    <span className="font-bold text-2xl">Loading</span>
                    <p className="text-zinc-500">Redirecting...</p>
                </div>
            )}
        </>
    )
}