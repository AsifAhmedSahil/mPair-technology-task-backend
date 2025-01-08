import { IAccountHead } from "./accountHead.interface";
import { AccountHead } from "./accountHead.model";

const createAccountHead = async (
  headName: string,
  accountType: "debit" | "credit"
): Promise<IAccountHead> => {
  const accountHead = new AccountHead({
    headName,
    accountType,
  });

  return await accountHead.save();
};

const getAllAccountHeads = async (): Promise<IAccountHead[]> => {
  return await AccountHead.find({});
};

export const accountHeadService = {
  createAccountHead,
  getAllAccountHeads,
};
