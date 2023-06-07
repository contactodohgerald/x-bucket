import mongoose, { Document, Schema } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  is_deleted: string;
}

const EnquirySchema: Schema = new Schema(
  {
    name: {
        type: String,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    is_deleted: {
      type: String,
      default: "no",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Enquiry = mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
export default Enquiry;
