"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const accountHead_route_1 = require("../modules/account-head/accountHead.route");
const accounting_route_1 = require("../modules/accounting/accounting.route");
const router = (0, express_1.Router)();
const middleRoute = [
    {
        path: "/auth",
        route: auth_route_1.authRouter,
    },
    {
        path: "/accountHead",
        route: accountHead_route_1.accountHeadRouter,
    },
    {
        path: "/accountRouter",
        route: accounting_route_1.accountRouter,
    },
];
middleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
