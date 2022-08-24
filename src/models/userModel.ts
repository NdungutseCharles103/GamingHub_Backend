import mongoose from "mongoose";
// import { registerSchema } from 'swaggiffy';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    picture:{
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    savedGames: {
        type: Array,
        default: []
    },
    googleId: {
        type: String,
        default: ''
    },
    ownGames:{
        type: Number,
        default: 0
    },
    friends: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);
// registerSchema('User', UserSchema, { orm: 'mongoose' })

export default mongoose.model("User", UserSchema);