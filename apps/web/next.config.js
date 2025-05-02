/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config({ path: `../../${process.env.NODE_ENV == 'production' ? '.env' : '.env.local'}` });
const nextConfig = {};

export default nextConfig;
