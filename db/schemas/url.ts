import mongoose from 'mongoose';

const URLSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.URL || mongoose.model('URL', URLSchema);