import mongoose from "mongoose";
import { schema } from mongoose;


const messageSchema = new schema({
    senderId: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: { type: String},
    Image: { type: String },
},{
    timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);
export default Message;