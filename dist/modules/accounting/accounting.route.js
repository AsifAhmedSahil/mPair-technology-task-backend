"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const accounting_controller_1 = require("./accounting.controller");
const router = express_1.default.Router();
router.post("/add-account", accounting_controller_1.accountController.addAccountController);
router.get("/get-account/:employeeId", accounting_controller_1.accountController.getAccountController);
router.get("/current-month/:employeeId", accounting_controller_1.accountController.getTotalDebitCreditAndAmountForCurrentMonthController);
router.get("/yearly-data/:employeeId", accounting_controller_1.accountController.getYearlyDebitCreditDataController);
exports.accountRouter = router;
