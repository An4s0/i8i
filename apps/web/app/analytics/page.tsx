"use client";
import { useState, useEffect, useRef } from "react";
import { Lock } from "@/components/icons";
import analytics from "@/lib/analytics";
import AnalyticsResults from "./analytics";

export interface AnalyticsFormat {
  shortCode: string;
  device: string;
  browser: string;
  os: string;
  country: string;
  referrer: string;
  createdAt: string;
}

export default function Analytics() {
  const [shortCode, setShortCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<[AnalyticsFormat]>();
  const fetchRef = useRef(false);

  useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;

    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get("code");
    setShortCode(code as string);

    const fetchAnalytics = async () => {
      const response = await analytics.get(code as string);
      if (response.success) {
        setData(response.data.analytics as [AnalyticsFormat]);
      }
    };

    fetchAnalytics();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await analytics.get(shortCode);
      if (response.success) {
        setError("");
        window.location.href = "/analytics?code=" + shortCode;
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error while fetching analytics:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (data) {
    return <AnalyticsResults data={data} shortCode={shortCode} />;
  } else {
    return (
      <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
        <span className="text-5xl font-bold text-primary">Analytics</span>
        <p className="mt-4 text-lg text-center text-subtle">
          Enter the short code to view analytics for your shortened link.
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
                type="text"
                placeholder="Enter short code to see analytics"
                className="w-full h-full focus:outline-none text-lg"
                value={shortCode ?? ""}
                onChange={(e) => setShortCode(e.target.value)}
              />
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg cursor-pointer hover:bg-primary/80"
                onClick={handleSubmit}
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
