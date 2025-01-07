import { Types } from "mongoose";

export interface IAccount {
    date: Date;
    accountType: 'debit' | 'credit'; 
    accountHead: Types.ObjectId
    amount: number; 
    employeeId: string;
  }
  