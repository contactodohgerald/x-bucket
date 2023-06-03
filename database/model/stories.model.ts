import mongoose, { Document, Schema } from 'mongoose';

export interface IStory  extends Document{
    userId: Schema.Types.ObjectId;
    prompt: string;
    body: string;
    is_deleted: string;
}

const StorySchema: Schema = new Schema(
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

const Story =  mongoose.model<IStory>('Story', StorySchema)
export default Story