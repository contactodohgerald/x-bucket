import mongoose, { Document, Schema } from 'mongoose';

export interface INewsletter  extends Document{
    email: string;
    is_deleted: string;
}

const NewsletterSchema: Schema = new Schema(
    {
        email: { 
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

const Newsletter =  mongoose.model<INewsletter>('Newsletter', NewsletterSchema)
export default Newsletter