type ShortenRequestBody ={
    originalUrl: string;
    days: number;
    password?: string;
}

export default ShortenRequestBody;