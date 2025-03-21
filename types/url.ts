export interface Url {
    originalUrl: string;
    shortUrl: string;
    password?: string;
    createdAt: Date;
    expiresAt?: Date;
}