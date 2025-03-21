import { NextResponse, NextRequest } from "next/server";

import connect from "@/lib/db";
import urlModel from "@/models/url";
import analyticsModel from "@/models/analytics";

import { APIResponse } from "@/types";
import apiMessages from "@/config/apiMessages.json";

export async function GET(req: NextRequest): Promise<NextResponse<APIResponse>> {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const shortUrl = searchParams.get("shortUrl");

        if (!shortUrl) {
            return NextResponse.json({
                success: false,
                message: apiMessages.error.invalid.shortUrl
            } as APIResponse, { status: 400 });
        }

        const existingUrl = await urlModel.exists({ shortUrl });
        if (!existingUrl) {
            await analyticsModel.deleteMany({ shortUrl });

            return NextResponse.json({
                success: false,
                message: apiMessages.error.invalid.shortUrl
            } as APIResponse, { status: 404 });
        }

        const analytics = await analyticsModel.find({ shortUrl });

        return NextResponse.json({
            success: true,
            message: apiMessages.success.analytics,
            data: {
                analytics
            }
        } as APIResponse);
    } catch (error) {
        console.error("Error in GET analytics:", error);

        return NextResponse.json({
            success: false,
            message: apiMessages.error.server
        } as APIResponse, { status: 500 });
    }
};