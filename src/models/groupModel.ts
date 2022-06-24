import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: Number,
        default: 1
    },
    posts: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Group', groupSchema);