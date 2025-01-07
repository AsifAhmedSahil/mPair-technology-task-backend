import moment from "moment";
import { AccountHead } from "../account-head/accountHead.model";
import { IAccount } from "./accounting.interface";
import { Account } from "./accounting.model";

const createAccount = async (
  date: Date,
  accountType: "debit" | "credit",
  accountHeadId: string,
  amount: number,
  employeeId: string
): Promise<IAccount> => {
  const accountHead = await AccountHead.findById(accountHeadId);
  if (!accountHead) {
    throw new Error("Account Head not found");
  }

  const account = new Account({
    date,
    accountType,
    accountHead: accountHeadId,
    amount,
    employeeId,
  });

  return await account.save();
};

const getAllAccountsForEmployee = async (
  employeeId: string
): Promise<IAccount[]> => {
  return await Account.find({ employeeId })
    .populate("accountHead", "name status")
    .exec();
};

const getTotalDebitCreditAndAmountForCurrentMonth = async (
  employeeId: string
) => {
  const currentMonthStart = moment().startOf("month").toDate();
  const currentMonthEnd = moment().endOf("month").toDate();

  const accounts = await Account.find({
    employeeId,
    date: { $gte: currentMonthStart, $lte: currentMonthEnd },
  }).exec();

  let totalDebit = 0;
  let totalCredit = 0;
  let totalAmount = 0;

  accounts.forEach((account: IAccount) => {
    if (account.accountType === "debit") {
      totalDebit += account.amount;
    } else if (account.accountType === "credit") {
      totalCredit += account.amount;
    }
  });

  totalAmount = totalDebit - totalCredit;

  return { totalDebit, totalCredit, totalAmount };
};

export const accountService = {
  createAccount,
  getAllAccountsForEmployee,
  getTotalDebitCreditAndAmountForCurrentMonth,
};
