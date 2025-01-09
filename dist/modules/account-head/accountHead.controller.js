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
exports.accountHeadController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const accountHead_service_1 = require("./accountHead.service");
const createAccountHeadController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { headName, accountType } = req.body;
    if (!headName || !accountType) {
        return res.status(400).json({
            success: false,
            message: "Both name and status are required.",
        });
    }
    const result = yield accountHead_service_1.accountHeadService.createAccountHead(headName, accountType);
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Account Head created successfully",
        data: result,
    });
}));
const getAllAccountHeadsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield accountHead_service_1.accountHeadService.getAllAccountHeads();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Fetched all Account Heads successfully",
        data: result,
    });
}));
exports.accountHeadController = {
    createAccountHeadController,
    getAllAccountHeadsController
};
