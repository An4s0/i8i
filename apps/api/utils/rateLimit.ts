import config from "../config.json";

const rateLimitMap = new Map<string, { count: number, startTime: number }>();
const maxRequests = 20000;
const rateLimitTime = 15 * 60 * 1000;

export function rateLimit(ipAddress: string): { allowed: boolean, message?: string } | void {
    const dateNow = Date.now();
    const requests = rateLimitMap.get(ipAddress) || { count: 0, startTime: dateNow };

    for (const [ip, reqData] of rateLimitMap) {
        if (dateNow - reqData.startTime > rateLimitTime) {
            rateLimitMap.delete(ip);
        }
    }

    if (dateNow - requests.startTime > rateLimitTime) {
        rateLimitMap.set(ipAddress, { count: 1, startTime: dateNow });
        return {
            allowed: true
        };
    } else if (requests.count >= maxRequests) {
        return {
            allowed: false, message: config.messages.error.rateLimit
        };
    } else {
        rateLimitMap.set(ipAddress, { count: requests.count + 1, startTime: requests.startTime });
        return {
            allowed: true
        };
    }
}