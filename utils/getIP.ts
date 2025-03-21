import { NextRequest } from 'next/server';

export function getIP(req: NextRequest): string | null {
    try {
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIP = req.headers.get('x-real-ip');

        let ipAddress = realIP || (forwardedFor ? forwardedFor.split(',')[0].trim() : null);

        return ipAddress && ipAddress !== 'Unknown' ? ipAddress : null;
    } catch {
        return null;
    }
}