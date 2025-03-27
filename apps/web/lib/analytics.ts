import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types";

const analytics = {
    getAnalytics: async (shortUrl: string) => {
        try {
            const response = await axios.get(`/api/analytics?shortUrl=${encodeURIComponent(shortUrl)}`);

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while fetching analytics');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data as APIResponse;
            }
            return { success: false, message: "An unexpected error occurred" } as APIResponse;
        }
    }
}

export default analytics;