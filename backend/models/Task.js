import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: false,
    },
    deadline: {
        type: Date,
        required: false,
    },
    completed: {
        type: Boolean,
        required: false ,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("Task", TaskSchema);