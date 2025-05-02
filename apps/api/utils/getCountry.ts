import axios from "axios";

export async function getCountry(ip: string): Promise<string> {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data.country || "Unknown";
  } catch (error) {
    console.error("Error fetching country:", error);
    return "Unknown";
  }
}
