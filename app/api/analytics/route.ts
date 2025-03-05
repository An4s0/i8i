import { NextResponse, NextRequest } from "next/server";
import connect from "@/db";
import urlSchema from "@/db/schemas/url";
import analyticsSchema from "@/db/schemas/analytics";
import ResponseFormat from "@/types/responseFormat";

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

        const existingUrl = await urlSchema.exists({ shortUrl });
        if (!existingUrl)
            return NextResponse.json({
                success: false,
                message: "URL not found"
            } as ResponseFormat, { status: 404 });

        const analytics = await analyticsSchema.find({ shortUrl });

        return NextResponse.json({
            success: true,
            message: "Analytics fetched successfully",
            data: {
                analytics
            }
        } as ResponseFormat);
    } catch (error) {
        console.error("Error in GET شnalytics:", error instanceof Error ? error.message : error);
        const isDev = process.env.NODE_ENV === "development";
        return NextResponse.json({
            success: false,
            message: isDev ? error instanceof Error ? error.message : error : "Server error"
        } as ResponseFormat, { status: 500 });
    }
};