"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createOrderValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        user: zod_1.default.string({ required_error: 'User is required' }),
        product: zod_1.default.string({ required_error: 'Product is required' }),
        quantity: zod_1.default.number({ required_error: 'Quantity is required & must be number' }).positive({ message: "Quantity must be greater than 0" }),
        totalPrice: zod_1.default.number().positive({ message: "Total Price must be greater than 0" }),
        status: zod_1.default.enum(["pending", "shipped", "delivered", "cancelled"])
    })
});
const updateOrderValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default.enum(["pending", "shipped", "delivered", "cancelled"])
    })
});
exports.OrderValidations = { createOrderValidationSchema, updateOrderValidationSchema };
