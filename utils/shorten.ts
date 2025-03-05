import axios from "axios";

const shorten = {
    get: async (shortUrl: string) => {
        try {
            const response = await axios.get(`/api/shorten?shortUrl=${encodeURIComponent(shortUrl)}`);

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while fetching shortened URL');
        } catch (error: any) {
            return error.response.data;
        }
    },
    create: async (originalUrl: string, days: number, password: string) => {
        try {
            const response = await axios.post(`/api/shorten`, { originalUrl, days, password });

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while creating shortened URL');
        } catch (error: any) {
            return error.response.data;
        }
    }
}

export default shorten;