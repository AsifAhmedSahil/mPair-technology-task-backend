"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountHeadRouter = void 0;
const express_1 = __importDefault(require("express"));
const accountHead_controller_1 = require("./accountHead.controller");
const router = express_1.default.Router();
router.post("/add-accountHead", accountHead_controller_1.accountHeadController.createAccountHeadController);
router.get("/get-account-heads", accountHead_controller_1.accountHeadController.getAllAccountHeadsController);
exports.accountHeadRouter = router;
