import moment from "moment";

import { IAccount } from "./accounting.interface";
import { Account } from "./accounting.model";

const createAccount = async (
  date: Date,
  accountType: "debit" | "credit",
  accountHeadId: string,
  amount: number,
  employeeId: string
): Promise<IAccount> => {


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
  employeeId: string,
  date: Date 
): Promise<IAccount[]> => {
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);

  return await Account.find({
    employeeId,
    date: { $gte: startOfDay, $lt: endOfDay }, 
  })
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

const getYearlyDebitCreditData = async (employeeId: string, year: number) => {
  const yearStart = moment(`${year}-01-01`).startOf("year").toDate();
  const yearEnd = moment(`${year}-12-31`).endOf("year").toDate();

  
  const accounts = await Account.find({
    employeeId,
    date: { $gte: yearStart, $lte: yearEnd },
  }).exec();

  const monthlyData: {
    [key: string]: { debitTotal: number; creditTotal: number };
  } = {};

  
  for (let month = 1; month <= 12; month++) {
    const monthYear = moment(`${year}-${month < 10 ? "0" : ""}${month}`).format(
      "YYYY-MM"
    );
    monthlyData[monthYear] = { debitTotal: 0, creditTotal: 0 };
  }

  
  accounts.forEach((account: IAccount) => {
    const monthYear = moment(account.date).format("YYYY-MM");

    if (account.accountType === "debit") {
      monthlyData[monthYear].debitTotal += account.amount;
    } else if (account.accountType === "credit") {
      monthlyData[monthYear].creditTotal += account.amount;
    }
  });

  
  const result = Object.keys(monthlyData).map((monthYear) => ({
    monthYear,
    debitTotal: monthlyData[monthYear].debitTotal,
    creditTotal: monthlyData[monthYear].creditTotal,
  }));

  return result;
};


export const accountService = {
  createAccount,
  getAllAccountsForEmployee,
  getTotalDebitCreditAndAmountForCurrentMonth,
  getYearlyDebitCreditData,
};
