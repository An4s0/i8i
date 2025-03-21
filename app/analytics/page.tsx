"use client";
import { useState, useEffect,useRef } from "react";
import Image from "next/image";

import analytics from "@/lib/analytics";
import { AnalyticsFormat } from "@/types";
import Analytics from "./users.line";

import { FaLink } from "react-icons/fa6";

export default function AnalyticsPage() {
    const [data, setData] = useState<[AnalyticsFormat]>();
    const [error, setError] = useState<string>();
    const [shortUrl, setShortUrl] = useState<string>();
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        async function fetchData() {
            const { searchParams } = new URL(window.location.href);
            const shortUrl = searchParams.get("shortUrl");
            if (shortUrl) {
                const response = await analytics.getAnalytics(shortUrl || "");
                if (response?.success) {
                    setData(response.data.analytics);
                } else {
                    setError(response?.message);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <div className='p-5'>
            {data && data.length > 0 ? (
                <Analytics data={data} />
            ) : (
                <div className='p-5'>
                    <div
                        className="absolute w-full h-10/12 left-1/2 top-1/2 transform -translate-y-1/2 mt-8 hidden lg:block"
                    >
                        <Image
                            src="/bg.svg"
                            alt="bg"
                            fill
                            style={{ objectFit: 'cover' }}
                            className=' rounded-4xl'
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center h-[calc(100vh-13rem)] w-full lg:w-1/2">
                        <span className="text-3xl font-bold z-10 sm:text-4xl text-center">
                            See how your link is performing
                        </span>
                        <p className="text-md mt-5 z-10 text-zinc-400 sm:text-lg">
                            Enter your short URL below to see analytics
                        </p>
                        {error && <p className="text-red-500 mt-2 font-bold">{error}</p>}
                        <div className="flex items-center mt-5 z-10 border border-zinc-600 rounded-3xl">
                            <FaLink className="text-2xl text-zinc-600 ml-5" />
                            <input
                                type="text"
                                placeholder={`Enter your short URL`}
                                className="sm:w-82 h-12 sm:px-5 rounded-3xl focus:outline-none w-48 p-2"
                                onChange={(e) => setShortUrl(e.target.value)}
                            />
                            <a href={`${shortUrl?.startsWith("http") && shortUrl.startsWith(process.env.NEXT_PUBLIC_APP_URL || "") ? shortUrl : "/analytics?shortUrl=" + shortUrl}`}>
                                <button
                                    className="bg-[#fdaa6b] hover:bg-[#fc987a] text-black font-semibold h-12 sm:w-32 rounded-3xl flex items-center justify-center ml-2 cursor-pointer w-28"
                                >
                                    Analyze
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}