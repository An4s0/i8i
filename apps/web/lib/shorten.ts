import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types";

const shorten = {
    get: async (shortUrl: string, password?: string) => {
        try {
            const response = await axios.get(`/api/shorten?shortUrl=${encodeURIComponent(shortUrl)}${password ? `&password=${password}` : ''}`);

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while fetching shortened URL');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data as APIResponse;
            }
            return { success: false, message: "An unexpected error occurred" } as APIResponse;
        }
    },
    create: async (originalUrl: string, days: number, password: string) => {
        try {
            const response = await axios.post(`/api/shorten`, { originalUrl, days, password });

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while creating shortened URL');
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return error.response.data as APIResponse;
            }
            return { success: false, message: "An unexpected error occurred" } as APIResponse;
        }
    }
}

export default shorten;