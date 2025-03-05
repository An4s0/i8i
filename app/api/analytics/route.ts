import { NextResponse, NextRequest } from "next/server";
import connect from "@/db";
import urlSchema from "@/db/schemas/url";
import analyticsSchema from "@/db/schemas/analytics";
import ResponseFormat from "@/types/responseFormat";
import { UAParser } from "ua-parser-js";
import getCountryFromIP from "@/helpers/getCountryFromIP";

export async function GET(req: NextRequest): Promise<NextResponse<ResponseFormat>> {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const shortUrl = searchParams.get("shortUrl");

        if (!shortUrl)
            return NextResponse.json({
                success: false,
                message: "Short URL not provided"
            } as ResponseFormat, { status: 400 });

        const findUrl = await urlSchema.findOne({ shortUrl });
        if (!findUrl)
            return NextResponse.json({
                success: false,
                message: "URL not found"
            } as ResponseFormat, { status: 404 });

        const analytics = await analyticsSchema.find({ shortUrl });

        const analyticsData = await Promise.all(analytics.map(async (data) => {
            const { device, browser, os } = UAParser(data.userAgent);
            const country = await getCountryFromIP(data.ipAddress);

            return {
                shortUrl: data.shortUrl,
                device: device || "Unknown",
                browser: browser?.name || "Unknown",
                os: os?.name || "Unknown",
                country: country,
                time: data.createdAt
            };
        }));

        return NextResponse.json({
            success: true,
            message: "Analytics fetched successfully",
            data: {
                analytics: analyticsData
            }
        } as ResponseFormat);
    } catch (error) {
        console.error("Error in GET Analytics:", error);
        return NextResponse.json({
            success: false,
            message: "Server error"
        } as ResponseFormat, { status: 500 });
    }
}