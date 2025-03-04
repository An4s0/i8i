import { NextResponse, NextRequest } from "next/server";
import connect from "@/db";
import ResponseFormat from "@/types/responseFormat";
import URLSchema from "@/db/schemas/url";
import AnalyticsSchema from "@/db/schemas/analytics";

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

        const findUrl = await URLSchema.findOne({ shortUrl });
        if (!findUrl)
            return NextResponse.json({
                success: false,
                message: "URL not found"
            } as ResponseFormat, { status: 404 });

        const analytics = await AnalyticsSchema.find({ shortUrl });

        return NextResponse.json({
            success: true,
            message: "Analytics fetched successfully",
            data: {
                analytics
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