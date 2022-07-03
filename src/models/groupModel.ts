import mongoose from 'mongoose';
// const { registerSchema } = require('swaggiffy');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true,
    },
    admins: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    posts: {
        type: Number,
        default: 0
    }
})

// registerSchema('Group', groupSchema, { orm: 'mongoose' });

export default mongoose.model('Group', groupSchema);