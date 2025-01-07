/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import config from "../../config";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utlis";

const signup = async (payload: TUser) => {
  // check user existance
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new Error("User Already Exists!");
  }

//   payload.role = "user";

  // console.log(payload)
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
    console.log(payload);
  
    // check user existance
    const user = await User.findOne({ employeeId: payload.employeeId }).select("+password");
    // console.log(!user)
    if (!user) {
      throw new Error("User Not Found!");
    }
  
    // check password is matched or not
    const passwordMatch = await isPasswordMatched(
      payload.password,
      user.password
    );
  
    if (!passwordMatch) {
      throw new Error("Password not matched!");
    }
  
    // jwt payload create
    const jwtPayload = {
      email: user.email,
      name:user.name,
      employeeId:user.employeeId,
      position:user.position,
      gender:user.gender,
      dateOfBirth:user.dateOfBirth
    };
    console.log(jwtPayload);
    console.log(config.jwt_refresh_secret);
  
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: config.jwt_access_expires,
    });
  
    const refreshToken = jwt.sign(
      jwtPayload,
      config.jwt_refresh_secret as string,
      {
        expiresIn: config.jwt_refresh_expires,
      }
    );
  
    return {
      accessToken,
      refreshToken,
      user
    };
  };



export const authServices = {
  signup,
  login
};
