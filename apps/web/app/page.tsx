"use client";
import { useState } from 'react';
import Image from 'next/image';
import shorten from '@/lib/shorten';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { FaLink, FaCalendarDays, FaLock } from "react-icons/fa6";

export default function HomePage() {
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const [isOption, setIsOption] = useState<boolean>(false);
    const [data, setData] = useState({
        originalUrl: '',
        days: 7,
        password: '',
    });
    const [error, setError] = useState<string>();
    const [buttonText, setButtonText] = useState("Copy");

    const handleClick = async () => {
        try {
            setError('');

            const response = await shorten.create(data.originalUrl, data.days, data.password);

            if (response.success) {
                setShortenedUrl(response.data.shortUrl);
                document.querySelector('input')!.value = '';
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${shortenedUrl}`);
        setButtonText("Copied!");

        setTimeout(() => {
            setButtonText("Copy");
        }, 2000);
    };

    return (
        <>
            <div className="absolute w-full h-10/12 left-1/2 top-1/2 transform -translate-y-1/2 mt-8 hidden lg:block">
                <Image
                    src="/bg.svg"
                    alt="bg"
                    fill
                    style={{ objectFit: 'cover', userSelect: 'none', pointerEvents: "none" }}
                    className=' rounded-4xl'
                />
            </div>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)] w-full lg:w-1/2">
                <div className="flex flex-col items-center justify-center p-3 z-10 w-full max-w-11/12">
                    <span className="text-3xl font-bold sm:text-5xl">
                        Shorten Your Links!
                    </span>
                    <p className="text-md mt-5 text-zinc-500 sm:text-lg text-center">
                        Convert any long URL into a short link with one click, with additional options to protect it with a password or set an expiration time.
                    </p>
                    {shortenedUrl ? (
                        <div className='w-full items-center lg:w-3/4 p-1 flex mt-5 rounded-xl space-y-3 shadow-2xl'>
                            <FaLink size={30} className='m-2 text-zinc-500' />&nbsp;&nbsp;
                            <hr className="h-6 border-l border-hr mt-3" />
                            <a href={`${process.env.NEXT_PUBLIC_APP_URL}/${shortenedUrl}`} className="text-lg text-blue-500 m-3" target="_blank">
                                {(process.env.NEXT_PUBLIC_APP_URL + '/' + shortenedUrl).length > 27 ? (process.env.NEXT_PUBLIC_APP_URL + '/' + shortenedUrl).slice(0, 27) + '...' : process.env.NEXT_PUBLIC_APP_URL + '/' + shortenedUrl}
                            </a>
                            <div onClick={handleCopy} className="cursor-pointer bg-primary text-white font-semibold py-3 px-7 rounded-xl text-center ml-auto">
                                {buttonText}
                            </div>
                        </div>
                    ) : (
                        <>
                            {error && <p className="text-red-500 mt-2 font-bold">{error}</p>}
                            <br />
                            <div className='w-full lg:w-2/3 p-3 flex flex-col items-center rounded-xl space-y-3 shadow-2xl'>
                                <Input
                                    type="text"
                                    placeholder="Enter your long URL"
                                    onChange={e => setData({ ...data, originalUrl: e.target.value })}
                                    icon={FaLink}
                                />

                                <p className="text-sm text-blue-600 font-semibold cursor-pointer" onClick={() => setIsOption(!isOption)}>
                                    More options ⮯
                                </p>

                                {isOption && (
                                    <>
                                        <Input
                                            type="number"
                                            placeholder="Enter number of days"
                                            value={data.days}
                                            onChange={e => setData({ ...data, days: parseInt(e.target.value || '1') })}
                                            icon={FaCalendarDays}
                                            label="days"
                                        />
                                        <Input
                                            type="password"
                                            placeholder="Set password (optional)"
                                            onChange={e => setData({ ...data, password: e.target.value })}
                                            icon={FaLock}
                                        />
                                    </>
                                )}
                            </div>
                            <Button onClick={handleClick}>
                                Shorten
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}