import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false ,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
}, {timestamps: true});

export default mongoose.model("User", UserSchema);