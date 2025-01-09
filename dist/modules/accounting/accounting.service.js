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
exports.accountService = void 0;
const moment_1 = __importDefault(require("moment"));
const accounting_model_1 = require("./accounting.model");
const createAccount = (date, accountType, accountHeadId, amount, employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const account = new accounting_model_1.Account({
        date,
        accountType,
        accountHead: accountHeadId,
        amount,
        employeeId,
    });
    return yield account.save();
});
const getAllAccountsForEmployee = (employeeId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);
    return yield accounting_model_1.Account.find({
        employeeId,
        date: { $gte: startOfDay, $lt: endOfDay },
    })
        .populate("accountHead", "name status")
        .exec();
});
const getTotalDebitCreditAndAmountForCurrentMonth = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentMonthStart = (0, moment_1.default)().startOf("month").toDate();
    const currentMonthEnd = (0, moment_1.default)().endOf("month").toDate();
    const accounts = yield accounting_model_1.Account.find({
        employeeId,
        date: { $gte: currentMonthStart, $lte: currentMonthEnd },
    }).exec();
    let totalDebit = 0;
    let totalCredit = 0;
    let totalAmount = 0;
    accounts.forEach((account) => {
        if (account.accountType === "debit") {
            totalDebit += account.amount;
        }
        else if (account.accountType === "credit") {
            totalCredit += account.amount;
        }
    });
    totalAmount = totalDebit - totalCredit;
    return { totalDebit, totalCredit, totalAmount };
});
const getYearlyDebitCreditData = (employeeId, year) => __awaiter(void 0, void 0, void 0, function* () {
    const yearStart = (0, moment_1.default)(`${year}-01-01`).startOf("year").toDate();
    const yearEnd = (0, moment_1.default)(`${year}-12-31`).endOf("year").toDate();
    const accounts = yield accounting_model_1.Account.find({
        employeeId,
        date: { $gte: yearStart, $lte: yearEnd },
    }).exec();
    const monthlyData = {};
    for (let month = 1; month <= 12; month++) {
        const monthYear = (0, moment_1.default)(`${year}-${month < 10 ? "0" : ""}${month}`).format("YYYY-MM");
        monthlyData[monthYear] = { debitTotal: 0, creditTotal: 0 };
    }
    accounts.forEach((account) => {
        const monthYear = (0, moment_1.default)(account.date).format("YYYY-MM");
        if (account.accountType === "debit") {
            monthlyData[monthYear].debitTotal += account.amount;
        }
        else if (account.accountType === "credit") {
            monthlyData[monthYear].creditTotal += account.amount;
        }
    });
    const result = Object.keys(monthlyData).map((monthYear) => ({
        monthYear,
        debitTotal: monthlyData[monthYear].debitTotal,
        creditTotal: monthlyData[monthYear].creditTotal,
    }));
    return result;
});
exports.accountService = {
    createAccount,
    getAllAccountsForEmployee,
    getTotalDebitCreditAndAmountForCurrentMonth,
    getYearlyDebitCreditData,
};
