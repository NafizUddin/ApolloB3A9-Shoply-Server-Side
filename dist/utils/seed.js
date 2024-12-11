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
exports.seedSuperAdmin = void 0;
/* eslint-disable no-console */
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("./prisma"));
const config_1 = __importDefault(require("../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSuperAdminExists = yield prisma_1.default.user.findUnique({
            where: {
                role: client_1.UserRole.SUPER_ADMIN,
                email: config_1.default.admin_email,
            },
        });
        if (!isSuperAdminExists) {
            const hashedPassword = yield bcryptjs_1.default.hash(config_1.default.admin_password, Number(config_1.default.bcrypt_salt_rounds));
            yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield tx.user.create({
                    data: {
                        email: config_1.default.admin_email,
                        password: hashedPassword,
                        role: client_1.UserRole.SUPER_ADMIN,
                    },
                });
                yield tx.admin.create({
                    data: {
                        name: 'Super Admin',
                        email: user.email,
                        profilePhoto: config_1.default.admin_profile_photo,
                    },
                });
            }));
            console.log('Super Admin created successfully...');
            console.log('Seeding completed...');
        }
    }
    catch (err) {
        console.log('Error in seeding', err);
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.seedSuperAdmin = seedSuperAdmin;
