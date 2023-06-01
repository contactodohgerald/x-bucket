import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteDetail  extends Document{
    email: string;
    logo_url: string;
    address: string;
    env: string;
    twitter: string;
    instagram: string;
}

const SiteDetailSchema: Schema = new Schema(
    {
        email : {
            type: String,
            trim: true,
            unique: true,
            require: true
        },
        logo_url: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        env: {
            type: String,
            trim: true,
        }, 
        twitter: {
            type: String,
            trim: true,
        },  
        instagram: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

  
const SiteDetail =  mongoose.model<ISiteDetail>('SiteDetails', SiteDetailSchema)
export default SiteDetail;
  