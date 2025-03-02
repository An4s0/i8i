import mongoose from 'mongoose';

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.URL || mongoose.model('URL', URLSchema);