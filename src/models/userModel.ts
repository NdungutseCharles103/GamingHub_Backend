import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: 'https://cdn-icons.flaticon.com/png/512/552/premium/552909.png?token=exp=1656011523~hmac=d27c22eae779fdba949f3a8433f6fbcc'
    },
    savedGames: {
        type: Array,
        default: []
    },
    ownGames:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

export default mongoose.model("User", UserSchema);