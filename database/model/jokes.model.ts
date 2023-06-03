import mongoose, { Document, Schema } from 'mongoose';

export interface IJoke  extends Document{
    userId: Schema.Types.ObjectId;
    body: string;
    is_deleted: string;
}

const JokeSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            require: true,
        },
        prompt: { 
            type: String,
            trim: true
        }, 
        body: { 
            type: String, 
            required: true,
            trim: true
        },
        is_deleted: {
            type: String,
            default: 'no',
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Joke =  mongoose.model<IJoke>('Joke', JokeSchema)
export default Joke