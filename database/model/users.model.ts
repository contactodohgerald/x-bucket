import mongoose, { Document, Schema } from 'mongoose';

export interface IUser  extends Document{
    xtifier: string;
    ip_address: string;
    status: string;
    password: string;
    user_type: string;
    is_subscribed: boolean;
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
        password:  { 
            type: String, 
            required: true,
            trim: true
        },
        user_type: {
            type: String,
            default: 'user',
        },
        is_subscribed: {
            type: String,
            default: false,
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