import mongoose, { Model } from 'mongoose';
import { Url } from '@/types';

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => /^https?:\/\/.+/.test(v),
            message: "Invalid URL format"
        }
    },
    shortUrl: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: [6, "Password must be at least 6 characters long"],
        max: [20, "Password must be at most 20 characters long"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        index: { expires: 0 },
    },
});

let UrlModel: Model<Url>;

try {
    UrlModel = mongoose.model<Url>("urls");
} catch (error) {
    UrlModel = mongoose.model<Url>("urls", urlSchema);
}

export default UrlModel;