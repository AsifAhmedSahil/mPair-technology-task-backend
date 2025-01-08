import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { accountHeadService } from "./accountHead.service";



const createAccountHeadController = catchAsync(async (req: Request, res: Response) => {
  const { headName, accountType } = req.body;

 
  if (!headName || !accountType) {
    return res.status(400).json({
      success: false,
      message: "Both name and status are required.",
    });
  }

  
  const result = await accountHeadService.createAccountHead(headName, accountType);

  
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Account Head created successfully",
    data: result,
  });
});

const getAllAccountHeadsController = catchAsync(async (req: Request, res: Response) => {
    
    const result = await accountHeadService.getAllAccountHeads();
  
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Fetched all Account Heads successfully",
      data: result,
    });
  });

export const accountHeadController = {
    createAccountHeadController,
    getAllAccountHeadsController
};
