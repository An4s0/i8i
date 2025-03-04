import mongoose from 'mongoose';

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

export default mongoose.models.URL || mongoose.model('URL', urlSchema);