import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription  extends Document{
    userId: Schema.Types.ObjectId;
    amount: number;
    payment_type: string;
    trans_ref: string;
    tx_ref: string;
    status: boolean;
    is_deleted: string;
}

const SubscriptionSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            require: true,
        },
        amount: { 
            type: Number,
            required: true,
            trim: true
        }, 
        payment_type: { 
            type: String,
            trim: true,
            default: 'subscribe-payment'
        },  
        trans_ref: { 
            type: String,
            trim: true
        },  
        tx_ref: { 
            type: String,
            trim: true
        }, 
        status: { 
            type: Boolean,
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

const Subscription =  mongoose.model<ISubscription>('Subscription', SubscriptionSchema)
export default Subscription