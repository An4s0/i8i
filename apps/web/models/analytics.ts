import mongoose, { Model, model, models } from 'mongoose';
import { AnalyticsFormat } from '@/types';

const analyticsSchema = new mongoose.Schema({
    shortUrl: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

let AnalyticsModel: Model<AnalyticsFormat>;

try {
    AnalyticsModel = mongoose.model<AnalyticsFormat>("analytics");
} catch (error) {
    AnalyticsModel = mongoose.model<AnalyticsFormat>("analytics", analyticsSchema);
}

export default AnalyticsModel;