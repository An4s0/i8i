"use client";
import { useState, useEffect } from "react";
import analytics from "@/utils/analytics";
import AnalyticsFormat from "@/types/analyticsFormat";
import Analytics from "@/components/analytics";

export default function Page() {
    const [data, setData] = useState<[AnalyticsFormat]>();

    useEffect(() => {
        async function fetchData() {
            const { searchParams } = new URL(window.location.href);
            const shortUrl = searchParams.get("shortUrl");
            const response = await analytics.getAnalytics(shortUrl || "");
            if (response.success) {
                setData(response.data.analytics);
            }
        }
        fetchData();
    }, []);


    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] space-y-2">
            {data && data.length > 0 ? (
                <Analytics data={data} />
            ) : (
                <h1 className="text-2xl font-bold">No analytics found</h1>
            )}
        </div>
    );
}