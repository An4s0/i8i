import { NextResponse, NextRequest } from "next/server";
import connect from "@/db";
import URLSchema from "@/db/schemas/url";

const generateRandomString = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { url } = await req.json();

        if (!url || !url.startsWith("http") || !url.includes(".")) {
            return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
        }

        const existingUrl = await URLSchema.findOne({ url })
        if (existingUrl) {
            return NextResponse.json({ shortUrl: existingUrl.shortUrl });
        }

        let exit = true;
        let randomShortUrl;
        let existingShortUrl;
        do {
            randomShortUrl = generateRandomString(5);
            existingShortUrl = await URLSchema.findOne({ shortUrl: randomShortUrl });
            if (!existingShortUrl) exit = false;
        } while (exit);

        const shortUrl = new URLSchema({ url, shortUrl: randomShortUrl });
        await shortUrl.save();

        return NextResponse.json({ shortUrl: randomShortUrl });

    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const shortUrl = searchParams.get("shortUrl");

        if (!shortUrl) {
            return NextResponse.json({ error: "shortUrl query parameter is required" }, { status: 400 });
        }

        const findURL = await URLSchema.findOne({ shortUrl });
        if (!findURL) {
            return NextResponse.json({ error: "URL not found" }, { status: 404 });
        }

        return NextResponse.json({ url: findURL.url });
    } catch (error) {
        console.error("Error in GET:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}