import express from "express";
import { authControllers } from "./auth.controller";



const router = express.Router();

router.post("/signup", authControllers.signupController);

export const authRouter = router;
