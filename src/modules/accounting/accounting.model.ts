import { Schema, model } from "mongoose";
import { IAccount } from "./accounting.interface";



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
    type: String,
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
