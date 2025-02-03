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
exports.isAdmin = exports.auth = void 0;
const { verifyToken } = require("@clerk/backend");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = res.get("authentication");
    try {
        const verified = yield verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });
        const userId = verified.sub;
        const role = verified.metadata.role;
        res.locals.userId = userId;
        res.locals.role = role;
        next();
    }
    catch (_a) {
        res.json({ status: "Forbidden" });
    }
});
exports.auth = auth;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.role !== "admin") {
        res.sendStatus(403);
        return;
    }
    next();
});
exports.isAdmin = isAdmin;
