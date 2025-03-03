const shorten = {
    get: async (shortUrl: string) => {
        try {
            const response = await fetch(`/api/shorten?shortUrl=${encodeURIComponent(shortUrl)}`);

            if (response.ok) {
                return response.json();
            }

            throw new Error('Error while fetching shortened URL');
        } catch (error: any) {
            return { error: error.response }
        }
    },
    create: async (originalUrl: string) => {
        try {
            const response = await fetch(`/api/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalUrl}),
            });

            if (response.ok) {
                return response.json();
            }

            throw new Error('Error while creating shortened URL');
        } catch (error: any) {
            return { error: error.response };
        }
    }
}

export default shorten;