"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createProductValidationSchema = zod_1.default.object({
    body: zod_1.default
        .object({
        name: zod_1.default.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        image: zod_1.default.string(),
        brand: zod_1.default.string({
            required_error: 'Brand is required',
            invalid_type_error: 'Brand must be a string',
        }),
        price: zod_1.default
            .number({
            required_error: 'Price is required',
            invalid_type_error: 'Price must be a number',
        })
            .positive('Please provide a valid price greater than 0'),
        type: zod_1.default
            .enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'])
            .refine((value) => value, {
            message: '{VALUE} is not matched with our types. Please, follow our types (Mountain, Road, Hybrid, BMX, Electric)',
        }),
        description: zod_1.default.string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        }),
        quantity: zod_1.default.number().min(0, 'Quantity may be 0 or more than zero'),
        inStock: zod_1.default.boolean(),
    })
        .refine((data) => data.quantity > 0 && data.inStock === true, {
        message: "If the quantity is greater than 0, inStock will be true; otherwise, it'll be false",
        path: ['inStock', 'quantity'],
    }),
});
const updateProductValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
            .optional(),
        image: zod_1.default.string().optional(),
        brand: zod_1.default
            .string({
            required_error: 'Brand is required',
            invalid_type_error: 'Brand must be a string',
        })
            .optional(),
        price: zod_1.default
            .number({
            required_error: 'Price is required',
            invalid_type_error: 'Price must be a number',
        })
            .positive('Please provide a valid price greater than 0')
            .optional(),
        type: zod_1.default
            .enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'])
            .refine((value) => value, {
            message: '{VALUE} is not matched with our types. Please, follow our types (Mountain, Road, Hybrid, BMX, Electric)',
        })
            .optional(),
        description: zod_1.default
            .string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        })
            .optional(),
        quantity: zod_1.default
            .number()
            .min(0, 'Quantity may be 0 or more than zero')
            .optional(),
        inStock: zod_1.default.boolean().optional(),
    }),
});
exports.ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
