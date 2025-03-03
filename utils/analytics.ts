const analytics = {
    getAnalytics: async (shortUrl: string) => {
        try {
            const response = await fetch(`/api/analytics?shortUrl=${encodeURIComponent(shortUrl)}`);

            if (response.ok) {
                return response.json();
            }

            throw new Error('Error while fetching analytics');
        } catch (error: any) {
            return { error: error.response }
        }
    }
}

export default analytics;