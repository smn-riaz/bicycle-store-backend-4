"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouters = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const user_validation_1 = require("../user/user.validation");
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginValidationSchema), auth_controller_1.AuthControllers.login);
router.patch('/update-password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(user_validation_1.UserValidation.updatePasswordValidationSchema), auth_controller_1.AuthControllers.updatePassword);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.refreshTokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
exports.AuthRouters = router;
