import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);