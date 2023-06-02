import mongoose, { Document, Schema } from 'mongoose';

export interface IUser  extends Document{
    xtifier: string;
    ip_address: string;
    status: string;
    avatar: string;
    country: string;
    user_type: string;
    is_deleted: string;
}

const UserSchema: Schema = new Schema(
    {
        xtifier: { 
            type: String, 
            required: true, 
            unique: true,
            trim: true
        },
        ip_address: { 
            type: String, 
            required: true,
            trim: true
        },
        status: { 
            type:Boolean,
            default: false
        },
        avatar: { 
            type:String,
            trim: true
        },
        country:  { 
            type: String, 
            required: true,
            trim: true
        },
        user_type: {
            type: String,
            default: 'user',
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

const Users =  mongoose.model<IUser>('User', UserSchema)
export default Users