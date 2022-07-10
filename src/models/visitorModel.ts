import mongoose from "mongoose";
import { registerSchema } from 'swaggiffy';

const visitorSchema = new mongoose.Schema({
    navigator: {
        type: Object,
        required: true
    },
    visitedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})
registerSchema('Visitor', visitorSchema, { orm: 'mongoose' })

export default mongoose.model("Visitor", visitorSchema);