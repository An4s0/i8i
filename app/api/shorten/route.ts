import { NextResponse, NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

import connect from "@/lib/db";
import urlModel from "@/models/url";
import analyticsModel from "@/models/analytics";

import { APIResponse } from "@/types";
import { genShortCode, rateLimit, getIP, getCountry } from "@/utils";
import apiMessages from "@/config/apiMessages.json";

export async function POST(req: NextRequest): Promise<NextResponse<APIResponse>> {
    try {
        await connect();

        const ipAddress = getIP(req) || "Unknown";
        if (!ipAddress) {
            return NextResponse.json({
                success: false,
                message: apiMessages.error.invalid.ip
            } as APIResponse, { status: 400 });
        }

        const rateLimitResponse = rateLimit(ipAddress);
        if (rateLimitResponse && !rateLimitResponse.allowed) {
            return NextResponse.json({
                success: false,
                message: rateLimitResponse.message
            } as APIResponse, { status: 429 });
        }

        const body = await req.text();

        if (!body) {
            return NextResponse.json({
                success: false,
                message: apiMessages.error.request.empty
            } as APIResponse, { status: 400 });
        }

        if (body.length > 1024) {
            return NextResponse.json({
                success: false,
                message: apiMessages.error.request.tooLarge
            } as APIResponse, { status: 413 });
        }

        let parsedBody;
        try {
            parsedBody = JSON.parse(body);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }

        const { originalUrl, days, password } = parsedBody;

        try {
            new URL(originalUrl);
        } catch (error) {
            console.error("Error parsing URL:", error);
            return NextResponse.json({
                success: false,
                message: apiMessages.error.invalid.url
            } as APIResponse, { status: 400 });
        }

        if (days != null && (days < 1 || days > 365)) {
            return NextResponse.json({
                success: false,
                message: apiMessages.error.invalid.days
            } as APIResponse, { status: 400 });
        }

        if (password != '' && (password.length < 6 || password.length > 20)) {
            return NextResponse.json({
                success: false,
                message: apiMessages.error.invalid.password
            } as APIResponse, { status: 400 });
        }

        const randomShortUrl = await genShortCode();

        await new urlModel({
            originalUrl,
            password,
            shortUrl: randomShortUrl,
            expiresAt: new Date(Date.now() + (days ?? 7) * 86400000)
        }).save();

        return NextResponse.json({
            success: true,
            message: apiMessages.success.shorten,
            data: {
                shortUrl: randomShortUrl
            }
        } as APIResponse);

    } catch (error) {
        console.error("Error in POST shorten:", error);

        return NextResponse.json({
            success: false,
            message: apiMessages.error.server
        } as APIResponse, { status: 500 });
    }
}

export async function GET(req: NextRequest): Promise<NextResponse<APIResponse>> {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const shortUrl = searchParams.get("shortUrl");
        const password = searchParams.get("password");

        if (!shortUrl) {
            return NextResponse.json({
                success: false,
                message: apiMessages.error.invalid.shortUrl
            } as APIResponse, { status: 400 });
        }

        const findShortUrl = await urlModel.findOne({ shortUrl });
        if (!findShortUrl) {
            return NextResponse.json({
                success: false,
                message: apiMessages.shorten.notFound
            } as APIResponse, { status: 404 });
        }

        if (findShortUrl.password && findShortUrl.password !== password) {
            return NextResponse.json({
                success: false,
                message: apiMessages.shorten.incorrectPassword
            } as APIResponse, { status: 401 });
        }

        const ipAddress = getIP(req) || "Unknown";
        const parser = new UAParser(req.headers.get("user-agent") || "Unknown");
        const country = await getCountry(ipAddress);

        await new analyticsModel({
            shortUrl,
            ipAddress,
            country,
            browser: parser.getBrowser().name || "Unknown",
            os: parser.getOS().name || "Unknown",
            device: parser.getDevice().type || "Desktop"
        }).save();

        return NextResponse.json({
            success: true,
            message: apiMessages.success.retrieved,
            data: {
                originalUrl: findShortUrl.originalUrl
            }
        } as APIResponse);

    } catch (error) {
        console.error("Error in GET shorten:", error);

        return NextResponse.json({
            success: false,
            message: apiMessages.error.server
        } as APIResponse, { status: 500 });
    }
}