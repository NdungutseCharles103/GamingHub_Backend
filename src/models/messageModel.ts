import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    room1: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    room2: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    to: {
        type: String,
        required: true
    }
})

export default mongoose.model("Message", messageSchema);