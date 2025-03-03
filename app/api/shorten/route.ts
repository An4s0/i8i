import { NextResponse, NextRequest } from "next/server";
import connect from "@/db";
import URLSchema from "@/db/schemas/url";
import generateRandomString from "@/helpers/generateRandomString";
import ResponseFormat from "@/types/responseFormat";
import checkUrl from "@/helpers/checkUrl";

export async function POST(req: NextRequest): Promise<NextResponse<ResponseFormat>> {
    try {
        await connect();
        const { originalUrl } = await req.json();

        if (!checkUrl(originalUrl))
            return NextResponse.json({
                success: false,
                message: "Invalid URL"
            } as ResponseFormat, { status: 400 });

        const existingOriginalUrl = await URLSchema.findOne({ originalUrl })
        if (existingOriginalUrl)
            return NextResponse.json({
                success: true,
                message: "URL already exists",
                data: {
                    shortUrl: existingOriginalUrl.shortUrl
                }
            } as ResponseFormat);

        let randomShortUrl;
        let existingShortUrl;
        do {
            randomShortUrl = generateRandomString(5);
            existingShortUrl = await URLSchema.findOne({ shortUrl: randomShortUrl });
            if (!existingShortUrl) break;
        } while (true);

        new URLSchema({
            originalUrl,
            shortUrl: randomShortUrl
        }).save();

        return NextResponse.json({
            success: true,
            message: "URL shortened successfully",
            data: {
                shortUrl: randomShortUrl
            }
        } as ResponseFormat);

    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({
            success: false,
            message: "Server error"
        } as ResponseFormat, { status: 500 });
    }
}

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

        return NextResponse.json({
            success: true,
            message: "URL found",
            data: {
                originalUrl: findUrl.originalUrl
            }
        } as ResponseFormat);
    } catch (error) {
        console.error("Error in GET:", error);
        return NextResponse.json({
            success: false,
            message: "Server error"
        } as ResponseFormat, { status: 500 });
    }
}