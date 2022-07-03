import mongoose from 'mongoose';
// const { registerSchema } = require('swaggiffy');

const postSchema = new mongoose.Schema({
    Text: {
        type: String,
        required: true
    },
    creatorDetails: {
        type: Object,
        required: true
    },
    pictures: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    group: {
        type: String,
    },
    videos: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);
// registerSchema('Post', postSchema, { orm: 'mongoose' });

export default mongoose.model('Post', postSchema);