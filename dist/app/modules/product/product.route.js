"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouters = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = (0, express_1.Router)();
router.post('/create-product', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductValidationSchema), product_controller_1.productController.createProduct);
router.get('/', product_controller_1.productController.getAllProducts);
router.get('/:productId', product_controller_1.productController.getSpecificProduct);
router.patch('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductValidationSchema), product_controller_1.productController.updateProduct);
router.delete('/:productId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductValidationSchema), product_controller_1.productController.deleteProduct);
exports.ProductRouters = router;
