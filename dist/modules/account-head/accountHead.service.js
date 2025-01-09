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
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountHeadService = void 0;
const accountHead_model_1 = require("./accountHead.model");
const createAccountHead = (headName, accountType) => __awaiter(void 0, void 0, void 0, function* () {
    const accountHead = new accountHead_model_1.AccountHead({
        headName,
        accountType,
    });
    return yield accountHead.save();
});
const getAllAccountHeads = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield accountHead_model_1.AccountHead.find({});
});
exports.accountHeadService = {
    createAccountHead,
    getAllAccountHeads,
};
