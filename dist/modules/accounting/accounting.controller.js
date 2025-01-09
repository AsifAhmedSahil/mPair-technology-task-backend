"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const accounting_service_1 = require("./accounting.service");
const addAccountController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, accountType, accountHead, amount, employeeId } = req.body;
    if (!date || !accountType || !accountHead || !amount) {
        return res.status(400).json({
            success: false,
            message: "All fields (date, accountType, accountHead, amount) are required.",
        });
    }
    const result = yield accounting_service_1.accountService.createAccount(date, accountType, accountHead, amount, employeeId);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Account added successfully",
        data: result,
    });
}));
const getAccountController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const accounts = yield accounting_service_1.accountService.getAllAccountsForEmployee(employeeId, parsedDate);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Fetched all accounts successfully for the specific date",
        data: accounts,
    });
}));
const getTotalDebitCreditAndAmountForCurrentMonthController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId } = req.params;
    const totals = yield accounting_service_1.accountService.getTotalDebitCreditAndAmountForCurrentMonth(employeeId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Total debit, credit, and amount for the current month fetched successfully",
        data: totals,
    });
}));
const getYearlyDebitCreditDataController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId } = req.params;
    const { year } = req.query;
    if (!year) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Year is required",
        });
    }
    const yearNumber = parseInt(year, 10);
    if (isNaN(yearNumber)) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Invalid year provided",
        });
    }
    const yearlyData = yield accounting_service_1.accountService.getYearlyDebitCreditData(employeeId, yearNumber);
    if (yearlyData.length === 0 ||
        (yearlyData[0].debitTotal === 0 && yearlyData[0].creditTotal === 0)) {
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
}));
exports.accountController = {
    addAccountController,
    getAccountController,
    getTotalDebitCreditAndAmountForCurrentMonthController,
    getYearlyDebitCreditDataController,
};
