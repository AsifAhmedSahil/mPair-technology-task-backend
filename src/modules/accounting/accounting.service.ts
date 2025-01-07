import { AccountHead } from "../account-head/accountHead.model";
import { IAccount } from "./accounting.interface";
import { Account } from "./accounting.model";



const createAccount = async (date: Date, accountType: 'debit' | 'credit', accountHeadId: string, amount: number,employeeId:string): Promise<IAccount> => {
  
  const accountHead = await AccountHead.findById(accountHeadId);
  if (!accountHead) {
    throw new Error("Account Head not found");
  }

  
  const account = new Account({
    date,
    accountType,
    accountHead: accountHeadId,
    amount,
    employeeId
  });


  return await account.save();
};

const getAllAccountsForEmployee = async (employeeId: string): Promise<IAccount[]> => {
    
    return await Account.find({ employeeId })
      .populate('accountHead', 'name status') 
      .exec();
  };

export const accountService = {
  createAccount,
  getAllAccountsForEmployee
};
