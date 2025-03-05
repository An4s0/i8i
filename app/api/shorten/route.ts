import { NextResponse, NextRequest } from "next/server";
import connect from "@/db";
import urlSchema from "@/db/schemas/url";
import analyticsSchema from "@/db/schemas/analytics";
import shortenRequestBody from "@/types/shortenRequestBody";
import ResponseFormat from "@/types/responseFormat";
import generateRandomString from "@/helpers/generateRandomString";

export async function POST(req: NextRequest): Promise<NextResponse<ResponseFormat>> {
    try {
        await connect();

        const body = await req.text();
        if (!body)
            return NextResponse.json({
                success: false,
                message: "Empty request body"
            } as ResponseFormat, { status: 400 });

        let parsedBody: shortenRequestBody;
        try {
            parsedBody = JSON.parse(body) as shortenRequestBody;
        } catch (error) {
            return NextResponse.json({
                success: false,
                message: "Invalid JSON"
            } as ResponseFormat, { status: 400 });
        }

        const { originalUrl, days, password } = parsedBody;

        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
        if (!originalUrl || !urlRegex.test(originalUrl))
            return NextResponse.json({
                success: false,
                message: "Invalid URL"
            } as ResponseFormat, { status: 400 });

        if (days != null && (days < 1 || days > 365))
            return NextResponse.json({
                success: false,
                message: "Days must be between 1 and 365"
            } as ResponseFormat, { status: 400 });

        if (password != null && (password.length < 6 || password.length > 20))
            return NextResponse.json({
                success: false,
                message: "Password must be between 6 and 20 characters"
            } as ResponseFormat, { status: 400 });

        let randomShortUrl;
        let existingShortUrl;
        do {
            randomShortUrl = generateRandomString(4);
            existingShortUrl = await urlSchema.findOne({ shortUrl: randomShortUrl });
            if (!existingShortUrl) break;
        } while (true);

        await new urlSchema({
            originalUrl,
            days,
            password,
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
        console.error("Error in POST Shorten:", error instanceof Error ? error.message : error);
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
        const password = searchParams.get("password");

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

        if (findUrl.password && findUrl.password !== password)
            return NextResponse.json({
                success: false,
                message: "Incorrect password"
            } as ResponseFormat, { status: 401 });

        const expiryDate = new Date(findUrl.createdAt);
        expiryDate.setDate(expiryDate.getDate() + (findUrl?.days || 0));
        if (expiryDate < new Date()) {
            await urlSchema.findOneAndDelete({ shortUrl });
            return NextResponse.json({
                success: false,
                message: "URL has expired"
            } as ResponseFormat, { status: 410 });
        }

        await new analyticsSchema({
            shortUrl,
            ipAddress: req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "Unknown",
            userAgent: req.headers.get("user-agent"),
        }).save();

        return NextResponse.json({
            success: true,
            message: "URL found",
            data: {
                originalUrl: findUrl.originalUrl
            }
        } as ResponseFormat);
    } catch (error) {
        console.error("Error in GET Shorten:", error instanceof Error ? error.message : error);
        return NextResponse.json({
            success: false,
            message: "Server error"
        } as ResponseFormat, { status: 500 });
    }
}