import config from "../../config";
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

const loginController = catchAsync(async (req, res) => {
  const result = await authServices.login(req.body);
  console.log("result from login", result);

  const { accessToken, refreshToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User Logged In Successfully",
    token: accessToken,
    data: user,
  });
});

export const authControllers = {
  signupController,
  loginController,
};
