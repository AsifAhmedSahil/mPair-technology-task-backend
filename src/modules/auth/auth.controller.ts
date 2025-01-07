
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";


const signupController = catchAsync(async (req, res) => {
    const result = await authServices.signup(req.body);
  
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User Registered Successfully",
      data: result,
    });
  });




 

  export const authControllers = {
    signupController,
    
  }