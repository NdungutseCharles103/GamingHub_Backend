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
    profilePicture:{
        type: String,
        default: 'https://cdn-icons.flaticon.com/png/512/552/premium/552909.png?token=exp=1656011523~hmac=d27c22eae779fdba949f3a8433f6fbcc'
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