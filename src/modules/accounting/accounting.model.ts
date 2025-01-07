import { Schema, model } from "mongoose";
import { IAccount } from "./accounting.interface";


// Define the Account schema
const accountSchema = new Schema<IAccount>({
  date: {
    type: Date,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['debit', 'credit'], 
    required: true,
  },
  accountHead: {
    type: Schema.Types.ObjectId,
    ref: 'AccountHead', 
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  employeeId: {
    type: String,
    required: true, 
  }
});


export const Account = model<IAccount>('Account', accountSchema);
