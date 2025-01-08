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
  
 
  let { date } = req.query;

  if (!date) {
    return res.status(400).json({
      success: false,
      message: "Date query parameter is required.",
    });
  }

  
  if (Array.isArray(date)) {
    date = date[0]; 
  }
  const dateString = typeof date === 'string' ? date : '';
  
  const parsedDate = new Date(dateString);

  
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid date format provided.",
    });
  }

  
  const accounts = await accountService.getAllAccountsForEmployee(employeeId, parsedDate);

  
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Fetched all accounts successfully for the specific date",
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

const getYearlyDebitCreditDataController = catchAsync(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const { year } = req.query; 

    if (!year) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Year is required",
      });
    }


    const yearNumber = parseInt(year as string, 10);

    
    if (isNaN(yearNumber)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid year provided",
      });
    }

    const yearlyData = await accountService.getYearlyDebitCreditData(
      employeeId,
      yearNumber
    );

    if (
      yearlyData.length === 0 ||
      (yearlyData[0].debitTotal === 0 && yearlyData[0].creditTotal === 0)
    ) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No data found for this year.",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Yearly debit and credit data fetched successfully",
      data: yearlyData,
    });
  }
);


export const accountController = {
  addAccountController,
  getAccountController,
  getTotalDebitCreditAndAmountForCurrentMonthController,
  getYearlyDebitCreditDataController,
};
