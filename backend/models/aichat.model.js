import mongoose from "mongoose";

const chat = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    }
})

export default mongoose.model("Chat", chat);