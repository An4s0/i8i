export interface ShortenRequest {
  originalUrl: string;
  days: number;
  password?: string;
}
