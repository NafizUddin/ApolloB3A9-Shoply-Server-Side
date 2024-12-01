"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const appError_1 = __importDefault(require("../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    let statusCode;
    let message = err.message || 'Something went wrong!';
    let error = err;
    // Prisma validation error (usually thrown for invalid data formats)
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = 'Validation Error';
        error = err.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        // Prisma error code 'P2002' indicates a unique constraint violation (duplicate key error)
        if (err.code === 'P2002') {
            statusCode = http_status_1.default.BAD_REQUEST;
            message = 'Duplicate Key error';
            error = err.meta;
        }
    }
    // Zod Validation Error
    else if (err instanceof zod_1.ZodError) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message = 'Zod Validation Error';
        error = err.issues.map((issue) => {
            return {
                path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
                message: issue === null || issue === void 0 ? void 0 : issue.message,
            };
        });
    }
    // throw new AppError validation
    else if (err instanceof appError_1.default) {
        message = err === null || err === void 0 ? void 0 : err.message;
        error = err.message;
    }
    return res.status(statusCode !== null && statusCode !== void 0 ? statusCode : http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message,
        error,
        stack: config_1.default.NODE_ENV === 'development' ? err.stack : null,
    });
};
exports.default = globalErrorHandler;
