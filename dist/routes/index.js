"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/Users/user.route");
const category_route_1 = require("../modules/Category/category.route");
const product_route_1 = require("../modules/Products/product.route");
const recentProduct_route_1 = require("../modules/Recent Products/recentProduct.route");
const coupon_route_1 = require("../modules/Coupon/coupon.route");
const order_route_1 = require("../modules/Orders/order.route");
const payment_route_1 = require("../modules/Payments/payment.route");
const review_route_1 = require("../modules/Reviews/review.route");
const router = (0, express_1.Router)();
const moduleRouter = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/recent-products',
        route: recentProduct_route_1.RecentViewProductRoutes,
    },
    {
        path: '/coupons',
        route: coupon_route_1.CouponRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
