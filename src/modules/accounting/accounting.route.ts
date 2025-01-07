import express from "express";
import { accountController } from "./accounting.controller";


const router = express.Router();

// Define the route to add a new Account
router.post("/add-account", accountController.addAccountController);
router.get("/get-account/:employeeId", accountController.getAccountController);

export const accountRouter = router;
