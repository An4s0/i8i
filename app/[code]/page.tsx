'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import shorten from "@/utils/shorten";
import { CgSearchLoading } from "react-icons/cg";
import NotFoundPage from "../not-found";

export default function Page() {
    const pathname = usePathname();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const getURL = async () => {
            const res = await shorten.get(pathname.slice(1));
            if (res.success) window.location.href = res.data.originalUrl;
            else setNotFound(true);
        }
        getURL();
    }, [pathname]);

    if (notFound) return <NotFoundPage />;

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
            <CgSearchLoading className="text-zinc-700" size={150} />
            <span className="font-bold text-2xl">Loading</span>
            <p className="text-zinc-500">Redirecting...</p>
        </div>
    )
}