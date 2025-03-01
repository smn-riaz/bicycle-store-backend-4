"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouters = void 0;
const express_1 = require("express");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("./user.constant");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUsers);
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), user_controller_1.UserController.createUser);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), user_controller_1.UserController.getSpecificUser);
router.delete('/deactivate-user/:userId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.deactivateUser);
exports.UserRouters = router;
