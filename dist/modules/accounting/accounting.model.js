"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
    },
    accountType: {
        type: String,
        enum: ['debit', 'credit'],
        required: true,
    },
    accountHead: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    }
});
exports.Account = (0, mongoose_1.model)('Account', accountSchema);
