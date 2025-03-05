import axios from "axios";

export default async function getCountryFromIP(ip: string): Promise<string> {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data.country || "Unknown";
    } catch (error) {
        console.error("Error fetching country:", error);
        return "Unknown";
    }
}