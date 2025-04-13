import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    browser: {
        type: String,
        required: true,
    },
    os: {
        type: String,
        required: true,
    },
    device: {
        type: String,
        required: true,
    },
    referrer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;