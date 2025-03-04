"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaLink, FaCalendarDays, FaLock } from "react-icons/fa6";
import shorten from '@/utils/shorten';

interface Position {
  top: string;
  left: string;
}

export default function Home() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [days, setDays] = useState<number>(7);
  const [password, setPassword] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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
      setError('');

      const response = await shorten.create(originalUrl as string, days, password);

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

  return (
    <div className='p-5'>
      <div
        className="absolute w-full h-10/12 left-1/2 top-1/2 transform -translate-y-1/2 mt-8 hidden lg:block"
      >
        <Image
          src="/bg.svg"
          alt="bg"
          layout="fill"
          objectFit="cover"
          className=' rounded-4xl'
        />
      </div>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)] w-full lg:w-1/2">
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
        <div className="flex flex-col justify-center p-3">
          <span className="text-3xl font-bold z-10 sm:text-5xl">
            Shorten Your Long URLs!
          </span>
          <p className="text-md mt-5 z-10 text-zinc-400 sm:text-lg">
            Enter your long URL below to shorten it
          </p>
          {error && <p className="text-red-500 mt-2 font-bold">{error}</p>}
          {shortenedUrl && (
            <p className="text-sm mt-5 z-10 text-zinc-400 sm:text-lg">
              Shortened URL: <a href={`${process.env.NEXT_PUBLIC_APP_URL}/${shortenedUrl}`} className="text-blue-500 underline">{process.env.NEXT_PUBLIC_APP_URL}/{shortenedUrl}</a>
            </p>
          )}
          <div className="flex items-center mt-5 z-10 border border-zinc-600 rounded-3xl">
            <FaLink className="text-2xl text-zinc-500 ml-5" />
            <input
              type="text"
              placeholder={`Enter your long URL`}
              className="h-12 sm:px-5 rounded-3xl focus:outline-none p-2"
            />
          </div>
          <div className="flex items-center mt-5 z-10 border border-zinc-600 rounded-3xl">
            <FaCalendarDays className="text-2xl text-zinc-500 ml-5" />
            <input
              type="number"
              defaultValue={days}
              placeholder={`Enter number of days`}
              className="h-12 sm:px-5 rounded-3xl focus:outline-none p-2 w-10/12"
              onChange={(e) => setDays(+e.target.value)}
            />
            <span className="text-zinc-600 mr-5">
              days
            </span>
          </div>
          <div className="flex items-center mt-5 z-10 ml-2">
            <input type="checkbox" id="password" className='mr-2' onChange={() => setIsPassword(!isPassword)} />
            <label htmlFor="password" className='text-zinc-500'>Add password</label>
          </div>
          {isPassword && (
            <div className="flex items-center mt-5 z-10 border border-zinc-600 rounded-3xl">
              <FaLock className="text-2xl text-zinc-600 ml-5" />
              <input
                type="password"
                placeholder={`Set password (optional)`}
                className="h-12 sm:px-5 rounded-3xl focus:outline-none p-2 w-10/12"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <button
            className="bg-[#fdaa6b] hover:bg-[#fc987a] text-black font-semibold h-12 w-48 rounded-3xl flex items-center justify-center mt-5 cursor-pointer z-10"
            onClick={handleClick}
          >
            Shorten
          </button>
        </div>
      </div>
    </div>
  );
}