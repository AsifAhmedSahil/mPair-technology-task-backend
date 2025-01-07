import { IAccountHead } from "./accountHead.interface";
import { AccountHead } from "./accountHead.model";


// Service to create a new AccountHead
const createAccountHead = async (name: string, status: 'debit' | 'credit'): Promise<IAccountHead> => {
  // Create the AccountHead object
  const accountHead = new AccountHead({
    name,
    status,
  });

  // Save to database and return the result
  return await accountHead.save();
};

const getAllAccountHeads = async (): Promise<IAccountHead[]> => {
    
    return await AccountHead.find({});
  };

export const accountHeadService = {
  createAccountHead,
  getAllAccountHeads
};
