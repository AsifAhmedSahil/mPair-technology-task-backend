import express from "express";
import { accountController } from "./accounting.controller";


const router = express.Router();


router.post("/add-account", accountController.addAccountController);
router.get("/get-account/:employeeId", accountController.getAccountController);
router.get("/current-month/:employeeId", accountController.getTotalDebitCreditAndAmountForCurrentMonthController);
router.get("/yearly-data/:employeeId", accountController.getYearlyDebitCreditDataController);

export const accountRouter = router;
