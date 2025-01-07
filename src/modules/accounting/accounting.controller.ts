import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { accountService } from "./accounting.service";

const addAccountController = catchAsync(async (req: Request, res: Response) => {
  const { date, accountType, accountHead, amount, employeeId } = req.body;

  if (!date || !accountType || !accountHead || !amount) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (date, accountType, accountHead, amount) are required.",
    });
  }

  const result = await accountService.createAccount(
    date,
    accountType,
    accountHead,
    amount,
    employeeId
  );

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Account added successfully",
    data: result,
  });
});

const getAccountController = catchAsync(async (req: Request, res: Response) => {
  const { employeeId } = req.params;

  const accounts = await accountService.getAllAccountsForEmployee(employeeId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Fetched all accounts successfully",
    data: accounts,
  });
});

const getTotalDebitCreditAndAmountForCurrentMonthController = catchAsync(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const totals =
      await accountService.getTotalDebitCreditAndAmountForCurrentMonth(
        employeeId
      );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        "Total debit, credit, and amount for the current month fetched successfully",
      data: totals,
    });
  }
);

export const accountController = {
  addAccountController,
  getAccountController,
  getTotalDebitCreditAndAmountForCurrentMonthController,
};
