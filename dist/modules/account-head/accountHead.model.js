"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHead = void 0;
const mongoose_1 = require("mongoose");
const accountHeadSchema = new mongoose_1.Schema({
    headName: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["debit", "credit"],
        required: true,
    },
});
exports.AccountHead = (0, mongoose_1.model)("AccountHead", accountHeadSchema);
