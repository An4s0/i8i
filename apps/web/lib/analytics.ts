import axios, { AxiosError } from "axios";
import config from "@/config.json";

export interface APIResponse {
    success: boolean;
    message: string;
    data?: {}
}

const analytics = {
    get: async (code: string) => {
        try {
            const response = await axios.get(`${config.urls.apiUrl}/analytics?code=${encodeURIComponent(code)}`);

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while fetching analytics');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data as APIResponse;
            }
            console.error("Error in GET analytics:", error);
            return { success: false, message: "An unexpected error occurred" } as APIResponse;
        }
    }
}

export default analytics;