import { Schema, model } from "mongoose";
import { IAccountHead } from "./accountHead.interface";

const accountHeadSchema = new Schema<IAccountHead>({
  headName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["debit", "credit"],
    required: true,
  },
});

export const AccountHead = model<IAccountHead>(
  "AccountHead",
  accountHeadSchema
);
