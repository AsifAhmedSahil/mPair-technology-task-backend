import { Schema, model } from "mongoose";
import { IAccountHead } from "./accountHead.interface";




// Create the Mongoose schema for AccountHead
const accountHeadSchema = new Schema<IAccountHead>({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['debit', 'credit'], // Validates that status must be either 'debit' or 'credit'
        required: true,
    }
});

// Create the Mongoose model for AccountHead
export const AccountHead = model<IAccountHead>('AccountHead', accountHeadSchema);
