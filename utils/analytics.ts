import axios from "axios";

const analytics = {
    getAnalytics: async (shortUrl: string) => {
        try {
            const response = await axios.get(`/api/analytics?shortUrl=${encodeURIComponent(shortUrl)}`);

            if (response.status === 200) {
                return response.data;
            }

            throw new Error('Error while fetching analytics');
        } catch (error: any) {
            return error.response.data;
        }
    }
}

export default analytics;