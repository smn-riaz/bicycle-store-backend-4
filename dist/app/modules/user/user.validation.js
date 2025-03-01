"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['user', 'admin']),
        isActivated: zod_1.z.boolean(),
        needsPasswordChange: zod_1.z.boolean()
    })
});
const updatePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string(),
        newPassword: zod_1.z.string()
    })
});
exports.UserValidation = { createUserValidationSchema, updatePasswordValidationSchema };
