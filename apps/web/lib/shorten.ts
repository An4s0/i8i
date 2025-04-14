import axios, { AxiosError } from "axios";
import config from "@/config.json";

export interface APIResponse {
    success: boolean;
    message: string;
    data?: object;
}

const shorten = {
    get: async (code: string, password?: string) => {
        try {
            const response = await axios.get(`${config.urls.apiUrl}/shorten?code=${encodeURIComponent(code)}${password ? `&password=${password}` : ''}`);

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while fetching shortened URL');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data as APIResponse;
            }
            console.error("Error in GET shorten:", error);
            return { success: false, message: "An unexpected error occurred" } as APIResponse;
        }
    },
    post: async (originalUrl: string, days: number, password: string) => {
        try {
            const response = await axios.post(`${config.urls.apiUrl}/shorten`, { originalUrl, days, password });

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while creating shortened URL');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data as APIResponse;
            }
            console.error("Error in POST shorten:", error);
            return { success: false, message: "An unexpected error occurred" } as APIResponse;
        }
    }
}

export default shorten;