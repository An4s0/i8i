'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import shorten from "@/utils/shorten";
import { CgSearchLoading, CgLock } from "react-icons/cg";
import NotFoundPage from "../not-found";
import MainLayout from "@/components/mainLayout";
import Header from "@/components/header";

export default function Page() {
    const pathname = usePathname();
    const [notFound, setNotFound] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();

    const getURL = async () => {
        const res = await shorten.get(pathname.slice(1), isPassword ? password : undefined);
        if (res.success) window.location.href = res.data.originalUrl;
        else if (res.message === "Incorrect password") {
            if (!isPassword) setIsPassword(true);
            else setError("Incorrect password");
        }
        else setNotFound(true);
    }

    useEffect(() => {
        getURL();
    }, [pathname]);

    if (notFound) return <NotFoundPage />;

    return (
        <MainLayout>
            <Header />
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
                        <div className="flex items-center mt-5 z-10 border border-zinc-600 rounded-3xl">
                            <CgLock className="text-2xl text-zinc-600 ml-5" />
                            <input
                                type="text"
                                placeholder={`Enter the password`}
                                className="sm:w-82 h-12 sm:px-5 rounded-3xl focus:outline-none w-48 p-2"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="bg-[#fdaa6b] hover:bg-[#fc987a] text-black font-semibold h-12 sm:w-32 rounded-3xl flex items-center justify-center ml-2 cursor-pointer w-28"
                                onClick={getURL}
                            >
                                Visit
                            </button>
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
        </MainLayout>
    )
}