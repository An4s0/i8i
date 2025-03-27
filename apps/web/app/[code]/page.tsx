'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NotFoundPage from "../not-found";
import shorten from "@/lib/shorten";
import Input from "@/components/ui/input";
import { CgSearchLoading, CgLock } from "react-icons/cg";
import apiMessages from "@/config/apiMessages.json";

export default function CodePage() {
    const pathname = usePathname();
    const [notFound, setNotFound] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();

    const getURL = async () => {
        const res = await shorten.get(pathname.slice(1), isPassword ? password : undefined);
        if (res.success) window.location.href = res.data.originalUrl;
        else if (res.message === apiMessages.shorten.incorrectPassword) {
            if (!isPassword) setIsPassword(true);
            else setError(res.message);
        }
        else setNotFound(true);
    }

    useEffect(() => {
        getURL();
    }, [pathname]);

    if (notFound) return <NotFoundPage />;

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
            {isPassword ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-13rem)] w-full lg:w-1/2">
                    <span className="text-3xl font-bold z-10 sm:text-4xl text-center">
                        This link is password protected
                    </span>
                    <p className="text-md mt-5 z-10 text-zinc-400 sm:text-lg">
                        Enter the password below to visit the link
                    </p>
                    {error && <p className="text-red-500 mt-2 font-bold">{error}</p>}
                    <div className='w-full items-center lg:w-2/3 p-2 flex mt-5 rounded-xl space-x-3 shadow-2xl'>
                        <Input
                            type="text"
                            placeholder="Enter your long URL"
                            onChange={e => setPassword(e.target.value)}
                            icon={CgLock}
                        />
                        <div onClick={getURL} className="cursor-pointer bg-primary text-white font-semibold p-3 px-7 rounded-xl text-center ml-auto">
                            Visit
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <CgSearchLoading className="text-zinc-700" size={150} />
                    <span className="font-bold text-2xl">Loading</span>
                    <p className="text-zinc-500">Redirecting...</p>
                </>
            )}
        </div>
    )
}