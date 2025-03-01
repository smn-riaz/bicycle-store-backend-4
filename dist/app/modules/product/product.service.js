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
exports.ProductServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_model_1 = __importDefault(require("./product.model"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const imageName_1 = require("../../constant/imageName");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createProductIntoDB = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const imgName = `${(0, imageName_1.imageName)()}${payload.name.replace(/\s/g, '')}`;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imgName, path);
    payload.image = secure_url;
    const result = yield product_model_1.default.create(payload);
    return result;
});
const getAllProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.default.find(), query).filter().sort().paginate();
    const result = productQuery.modelQuery;
    return result;
});
const getSpecificProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "There is no Product found");
    }
    return result;
});
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield product_model_1.default.findById(id))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "There is no Product found");
    }
    const result = yield product_model_1.default.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield product_model_1.default.findById(id))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "There is no User found");
    }
    const result = yield product_model_1.default.findByIdAndDelete(id, { new: true });
    return result;
});
exports.ProductServices = { createProductIntoDB, updateProductIntoDB, deleteProductFromDB, getAllProductsFromDB, getSpecificProductFromDB };
