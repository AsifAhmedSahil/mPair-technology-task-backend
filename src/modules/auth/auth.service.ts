/* eslint-disable @typescript-eslint/no-explicit-any */


import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

import jwt from "jsonwebtoken";

const signup = async (payload: TUser) => {
  // check user existance
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new Error("User Already Exists!");
  }

  payload.role = "user";

  // console.log(payload)
  const result = await User.create(payload);
  return result;
};




export const authServices = {
  signup,
  
};
