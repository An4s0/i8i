"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaLink, FaCalendarDays, FaLock } from "react-icons/fa6";
import shorten from '@/utils/shorten';
import MainLayout from '@/components/mainLayout';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function Home() {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [data, setData] = useState({
    originalUrl: '',
    days: 7,
    password: '',
  });
  const [error, setError] = useState<string>();

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

  return (
    <MainLayout>
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
        <div className="flex flex-col justify-center p-3 z-10">
          <span className="text-3xl font-bold sm:text-5xl">
            Shorten Your Long URLs!
          </span>
          <p className="text-md mt-5 text-zinc-400 sm:text-lg">
            Enter your long URL below to shorten it
          </p>
          {error && <p className="text-red-500 mt-2 font-bold">{error}</p>}
          {shortenedUrl && (
            <p className="text-sm mt-5 text-zinc-400 sm:text-lg">
              Shortened URL:&nbsp;
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/${shortenedUrl}`} className="text-blue-500 underline">
                {process.env.NEXT_PUBLIC_APP_URL}/{shortenedUrl}
              </a>
            </p>
          )}
          <Input
            type="text"
            placeholder="Enter your long URL"
            onChange={e => setData({ ...data, originalUrl: e.target.value })}
            icon={FaLink}
          />
          <Input
            type="number"
            placeholder="Enter number of days"
            value={data.days}
            onChange={e => setData({ ...data, days: parseInt(e.target.value) })}
            icon={FaCalendarDays}
            label="days"
          />
          <Input
            type="checkbox"
            id="password"
            label="Add password"
            onChange={() => setIsPassword(!isPassword)}
          />
          {isPassword && (
            <Input
              type="password"
              placeholder="Set password (optional)"
              onChange={e => setData({ ...data, password: e.target.value })}
              icon={FaLock}
            />
          )}
          <Button onClick={handleClick}>
            Shorten
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}