"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaLink } from "react-icons/fa6";
import shorten from '@/utils/shorten';

interface Position {
  top: string;
  left: string;
}

export default function Home() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  const generateRandomPositions = () => {
    const randomPositions: Position[] = Array(2).fill(0).map(() => ({
      top: `${Math.random() * 80}vh`,
      left: `${Math.random() * 40}vw`,
    }));
    setPositions(randomPositions);
  };

  useEffect(() => {
    generateRandomPositions();
  }, []);

  const handleClick = async () => {
    try {
      const originalUrl = document.querySelector('input')?.value;

      const res = await shorten.create(originalUrl as string);

      if (res.success) {
        setShortenedUrl(res.data.shortUrl);
        document.querySelector('input')!.value = '';
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='p-5'>
      <div
        className="absolute w-full h-10/12 left-1/2 top-1/2 transform -translate-y-1/2 mt-8 hidden lg:block"
      >
        <Image
          src="/bg.svg"
          alt="bg"
          fill
          style={{objectFit:"cover"}}
          className=' rounded-4xl'
        />
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-13rem)] w-full lg:w-1/2">
        {positions.map((position, index) => (
          <div
            key={index}
            className="w-40 h-40 relative shadow-2xl shadow-black rounded-3xl rotate-45"
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
            }}
          />
        ))}
        <span className="text-3xl font-bold z-10 sm:text-5xl">
          Shorten Your Long URLs!
        </span>
        <p className="text-md mt-5 z-10 text-zinc-400 sm:text-lg">
          Enter your long URL below to shorten it
        </p>
        {shortenedUrl && (
          <p className="text-sm mt-5 z-10 text-zinc-400 sm:text-lg">
            Shortened URL: <a href={`${process.env.NEXT_PUBLIC_APP_URL}/${shortenedUrl}`} className="text-blue-500 underline">{process.env.NEXT_PUBLIC_APP_URL}/{shortenedUrl}</a>
          </p>
        )}
        <div className="flex items-center mt-5 z-10 border border-zinc-600 rounded-3xl">
          <FaLink className="text-2xl text-zinc-600 ml-5" />
          <input
            type="text"
            placeholder={`Enter your long URL`}
            className="sm:w-82 h-12 sm:px-5 rounded-3xl focus:outline-none w-48 p-2"
          />
          <button
            className="bg-[#fdaa6b] hover:bg-[#fc987a] text-black font-semibold h-12 sm:w-32 rounded-3xl flex items-center justify-center ml-2 cursor-pointer w-28"
            onClick={handleClick}
          >
            Shorten
          </button>
        </div>
      </div>
    </div>
  );
}