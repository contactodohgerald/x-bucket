import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipe  extends Document{
    userId: Schema.Types.ObjectId;
    body: string;
    is_deleted: string;
}

const RecipeSchema: Schema = new Schema(
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

const Recipe =  mongoose.model<IRecipe>('Recipe', RecipeSchema)
export default Recipe