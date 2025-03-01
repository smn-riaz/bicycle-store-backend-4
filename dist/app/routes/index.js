"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const product_route_1 = require("../modules/product/product.route");
const order_route_1 = require("../modules/order/order.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRouters
    },
    {
        path: '/products',
        route: product_route_1.ProductRouters
    },
    {
        path: '/orders',
        route: order_route_1.OrderRouters
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRouters
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
