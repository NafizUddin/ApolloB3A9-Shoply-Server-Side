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
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../errors/appError"));
const verifyJWT_1 = require("../utils/verifyJWT");
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const client_1 = require("@prisma/client");
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
            const decoded = (0, verifyJWT_1.verifyToken)(token, config_1.default.jwt_access_secret);
            const { role, email } = decoded;
            yield prisma_1.default.user.findUniqueOrThrow({
                where: {
                    email,
                    status: client_1.UserStatus.ACTIVE,
                },
            });
            if (roles.length && !roles.includes(role)) {
                throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden!');
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
