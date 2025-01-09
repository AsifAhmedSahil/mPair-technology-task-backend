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
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const auth_utlis_1 = require("./auth.utlis");
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new Error("User Already Exists!");
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const user = yield user_model_1.User.findOne({ employeeId: payload.employeeId }).select("+password");
    if (!user) {
        throw new Error("User Not Found!");
    }
    const passwordMatch = yield (0, auth_utlis_1.isPasswordMatched)(payload.password, user.password);
    if (!passwordMatch) {
        throw new Error("Password not matched!");
    }
    const jwtPayload = {
        email: user.email,
        name: user.name,
        employeeId: user.employeeId,
        position: user.position,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
    };
    console.log(jwtPayload);
    console.log(config_1.default.jwt_refresh_secret);
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires,
    });
    return {
        accessToken,
        refreshToken,
        user,
    };
});
exports.authServices = {
    signup,
    login,
};
