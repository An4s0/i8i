'use client';
import { useState } from "react";
import { Link, Lock, Calendar } from "@/components/icons";
import config from "../config.json"

export default function Home() {
  const [moreOptions, setMoreOptions] = useState(false);
  const [data, setData] = useState({
    url: "",
    password: "",
    expiration: 7,
  });
  const [error, setError] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState("Copy");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(data.url)) {
      setError("Please enter a valid URL");
      return;
    }
    if (!data.url) {
      setError("Please enter a URL");
      return;
    }
    if (data.url.startsWith("http://")) {
      data.url = data.url.replace("http://", "https://");
    }
    if (data.expiration < 1 || data.expiration > 365 || isNaN(data.expiration)) {
      setError("Expiration time must be between 1 and 365 days");
      return;
    }
    if (data.password.length >= 1 && data.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");

    console.log("Data submitted:", data);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setShortenedUrl("https://i8i.pw/abc12");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied("Copied!");
    setTimeout(() => {
      setCopied("Copy");
    }, 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
      <span className="text-5xl font-bold text-primary">
        Create Short Link
      </span>
      <p className="mt-4 text-lg text-center text-subtle">
        Enter your link and adjust the settings such as expiration time or add an optional password.
      </p>
      {error && (
        <p className="mt-2 text-lg text-center text-red-500 font-semibold">
          {error}
        </p>
      )}
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mt-8">
        <div className="w-full p-4 rounded-lg shadow-md">
          <div className="w-full h-12 p-2 rounded-lg bg-primary/10 flex items-center gap-3">
            <Link size={30} className="text-primary/80" />
            <input
              type="text"
              placeholder="Paste a link to shorten it!"
              className="w-full h-full focus:outline-none text-lg"
              value={shortenedUrl ? shortenedUrl : data.url}
              readOnly={!!shortenedUrl}
              onChange={(e) => setData({ ...data, url: e.target.value })}
            />
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg cursor-pointer hover:bg-primary/80"
              onClick={shortenedUrl ? handleCopy : handleSubmit}
            >
              {loading ? "Shortening..." : (shortenedUrl ? copied : "Shorten")}
            </button>
          </div>
          {!shortenedUrl && (
            <>
              {moreOptions && (
                <div className="flex flex-col items-center justify-center mt-4">
                  <div className="w-full p-2 rounded-lg bg-primary/10 flex items-center gap-3">
                    <Lock size={26} className="text-primary/80" />
                    <input
                      type="text"
                      placeholder="Optional password"
                      className="w-full h-full focus:outline-none text-lg"
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                  </div>
                  <div className="w-full p-2 rounded-lg bg-primary/10 flex items-center gap-3 mt-4">
                    <Calendar size={22} className="text-primary/80" />
                    <input
                      type="number"
                      placeholder="Expiration time (in days)"
                      defaultValue="7"
                      min={1}
                      max={365}
                      className="w-full h-full focus:outline-none text-lg"
                      onChange={(e) => setData({ ...data, expiration: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <div className="flex mt-4 items-center justify-center">
            <span
              className="text-sm text-subtle font-semibold cursor-pointer hover:text-link-hover"
              onClick={shortenedUrl ? () => window.location.href = `${config.urls.baseUrl}/analytics?code=${shortenedUrl.split('/').pop()}` : () => setMoreOptions(!moreOptions)}
            >
              {shortenedUrl ? "See Analytics" : moreOptions ? "Less Options" : "More Options"}
            </span>
          </div>
        </div>
        <div className="flex mt-4 items-center justify-center">
          <span className="text-sm text-subtle">
            Use it, its free, open source, secure and long term link.
          </span>
        </div>
      </div>
    </main>
  );
}
