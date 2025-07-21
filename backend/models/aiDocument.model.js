import mongoose from "mongoose";

const document = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    }
})

export default mongoose.model("Document", document);