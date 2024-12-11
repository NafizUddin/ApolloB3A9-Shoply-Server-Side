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
exports.CouponServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.discountValue <= 0) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Discount value must be greater than 0.');
    }
    const coupon = yield prisma_1.default.coupon.create({
        data: payload,
    });
    return coupon;
});
const getAllCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const activeCoupons = yield prisma_1.default.coupon.findMany({
        where: {
            isActive: true,
        },
    });
    return activeCoupons;
});
const updateCoupon = (couponId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCouponExists = yield prisma_1.default.coupon.findUnique({
        where: { id: couponId },
    });
    if (!isCouponExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found!');
    }
    const updatedCoupon = yield prisma_1.default.coupon.update({
        where: { id: couponId },
        data: payload,
    });
    return updatedCoupon;
});
const deleteCoupon = (couponId) => __awaiter(void 0, void 0, void 0, function* () {
    const isCouponExists = yield prisma_1.default.coupon.findUnique({
        where: { id: couponId },
    });
    if (!isCouponExists) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found!');
    }
    const deletedCoupon = yield prisma_1.default.coupon.update({
        where: { id: couponId },
        data: {
            isActive: false,
        },
    });
    return deletedCoupon;
});
// const applyCoupon = async (
//   payload: {
//     coupon: string;
//   },
//   user: IAuthUser,
// ) => {
//   const customer = await prisma.customer.findUnique({
//     where: {
//       email: user?.email,
//       isDeleted: false,
//     },
//   });
//   if (!customer) {
//     throw new AppError(httpStatus.NOT_FOUND, "Customer doesn't exist!");
//   }
//   const existingCoupon = await prisma.coupon.findUnique({
//     where: {
//       code: payload.coupon,
//     },
//   });
//   if (!existingCoupon) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found!');
//   }
//   if (new Date() > existingCoupon.endDate) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       'Coupon is inactive or expired!',
//     );
//   }
//   const alreadyRedeemed = await prisma.customerCoupon.findUnique({
//     where: {
//       customerId_couponId: {
//         customerId: customer.id,
//         couponId: existingCoupon.id,
//       },
//     },
//   });
//   if (alreadyRedeemed) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Coupon already redeemed!');
//   }
//   const result = await prisma.$transaction(async (tx) => {
//     await tx.coupon.update({
//       where: { id: existingCoupon.id },
//       data: { usedCount: { increment: 1 } },
//     });
//     const customerUsedCoupon = await tx.customerCoupon.create({
//       data: {
//         customerId: customer.id,
//         couponId: existingCoupon.id,
//         redeemedAt: new Date(),
//         isRedeemed: true,
//       },
//       include: {
//         customer: true,
//         coupon: true,
//       },
//     });
//     return customerUsedCoupon;
//   });
//   return result;
// };
exports.CouponServices = {
    createCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon,
    // applyCoupon,
};
