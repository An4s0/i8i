import { NextResponse, NextRequest } from "next/server";
import connect from "@/db";
import urlSchema from "@/db/schemas/url";
import analyticsSchema from "@/db/schemas/analytics";
import shortenRequestBody from "@/types/shortenRequestBody";
import ResponseFormat from "@/types/responseFormat";
import generateRandomString from "@/helpers/generateRandomString";
import rateLimit from "@/helpers/rateLimit";
import mongoose from "mongoose";

export async function POST(req: NextRequest): Promise<NextResponse<ResponseFormat>> {
    try {
        await connect();

        const ipAddress = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "Unknown";
        if (!ipAddress || ipAddress === "Unknown") {
            return NextResponse.json({
                success: false,
                message: "Invalid IP address"
            } as ResponseFormat, { status: 400 });
        }

        const rateLimitResponse = rateLimit(ipAddress);
        if (rateLimitResponse && !rateLimitResponse.allowed) {
            return NextResponse.json({
                success: false,
                message: rateLimitResponse.message
            } as ResponseFormat, { status: 429 });
        }

        const body = await req.text();
        if (!body)
            return NextResponse.json({
                success: false,
                message: "Empty request body"
            } as ResponseFormat, { status: 400 });

        if (body.length > 1024)
            return NextResponse.json({
                success: false,
                message: "Request body is too large"
            } as ResponseFormat, { status: 413 });

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
            password,
            shortUrl: randomShortUrl,
            expiresAt: days ? new Date(Date.now() + days * 24 * 60 * 60 * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }).save();

        return NextResponse.json({
            success: true,
            message: "URL shortened successfully",
            data: {
                shortUrl: randomShortUrl
            }
        } as ResponseFormat);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
            return NextResponse.json({
                success: false,
                message: "Validation error: " + error.message,
            } as ResponseFormat, { status: 400 });
        console.error("Error in POST shorten:", error instanceof Error ? error.message : error);
        const isDev = process.env.NODE_ENV === "development";
        return NextResponse.json({
            success: false,
            message: isDev ? error instanceof Error ? error.message : error : "Server error"
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
        console.error("Error in GET shorten:", error instanceof Error ? error.message : error);
        const isDev = process.env.NODE_ENV === "development";
        return NextResponse.json({
            success: false,
            message: isDev ? error instanceof Error ? error.message : error : "Server error"
        } as ResponseFormat, { status: 500 });
    }
}