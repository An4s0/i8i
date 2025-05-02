"use client";
import { useState, useEffect, useCallback } from "react";
import { Lock } from "@/components/icons";
import { usePathname } from "next/navigation";
import NotFoundPage from "@/app/not-found";
import shorten from "@/lib/shorten";

export default function Shorten() {
  const pathname = usePathname();
  const [notFound, setNotFound] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const getURL = useCallback(async () => {
    const res = await shorten.get(
      pathname.split("/")[2] ?? "",
      isPassword ? password : undefined,
    );
    if (res.success) window.location.href = res.data.originalUrl;
    else if (res.data.protected) {
      if (!isPassword) setIsPassword(true);
      else setError(res.message);
    } else setNotFound(true);
  }, [pathname, isPassword, password]);

  useEffect(() => {
    getURL();
  }, [getURL]);

  if (notFound) return <NotFoundPage />;

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
      {isPassword ? (
        <>
          <span className="text-5xl font-bold text-primary">
            Protected Link
          </span>
          <p className="mt-4 text-lg text-center text-subtle">
            This link is protected by a password. Please enter the password to
            access the link.
          </p>
          {error && (
            <p className="mt-2 text-lg text-center text-red-500 font-semibold">
              {error}
            </p>
          )}
          <div className="flex flex-col items-center justify-center w-full max-w-2xl mt-8">
            <div className="w-full p-4 rounded-lg shadow-md">
              <div className="w-full h-12 p-2 rounded-lg bg-primary/10 flex items-center gap-3">
                <Lock size={30} className="text-primary/80" />
                <input
                  type="password"
                  placeholder="Enter password to access the link"
                  className="w-full h-full focus:outline-none text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg cursor-pointer hover:bg-primary/80"
                  onClick={getURL}
                >
                  Visit
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className="font-bold text-2xl">Loading</span>
          <p className="text-zinc-500">Redirecting...</p>
        </>
      )}
    </main>
  );
}
