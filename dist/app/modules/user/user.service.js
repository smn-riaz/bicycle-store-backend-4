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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Email is already registered !');
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(
    // {isActivated:true}
    ), query).filter().sort().paginate();
    const result = yield userQuery.modelQuery;
    return result;
});
const getSpecificUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "There is no User found");
    }
    if (result.role !== "user") {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "There is no User found");
    }
    return result;
});
const deactivateUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findById(id);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No user is found !');
    }
    if (!(isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isActivated)) {
        yield user_model_1.User.findByIdAndUpdate(id, { isActivated: true }, { new: true });
    }
    if ((isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isActivated)) {
        yield user_model_1.User.findByIdAndUpdate(id, { isActivated: false }, { new: true });
    }
});
exports.UserServices = { createUser, deactivateUser, getAllUsers, getSpecificUser };
