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
exports.OrderServices = exports.orderServices = void 0;
const order_constant_1 = require("./order.constant");
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_model_1 = require("./order.model");
const user_model_1 = require("../user/user.model");
const product_model_1 = __importDefault(require("../product/product.model"));
// import { orderUtils } from './order.utils';
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, product, quantity } = payload;
    const isUserExist = yield user_model_1.User.findById(user);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'There is no User found');
    }
    const isProductExist = yield product_model_1.default.findById(product);
    if (!isProductExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'There is no Product found');
    }
    if (isProductExist.quantity < 1 || !isProductExist.inStock) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'There is no product in stock');
    }
    if (isProductExist.quantity < quantity) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Your order amount exceeds the available stock');
    }
    const result = yield order_model_1.Order.create(payload);
    if (result) {
        yield product_model_1.default.findByIdAndUpdate(product, [
            {
                $set: {
                    quantity: { $subtract: ['$quantity', quantity] },
                    inStock: {
                        $gt: [{ $subtract: ['$quantity', quantity] }, 0],
                    },
                },
            },
        ], { new: true });
    }
    // payment integration
    // const shurjopayPayload = {
    //   amount:result.totalPrice,
    //   order_id: result._id,
    //   currency:'BDT',
    //   customer_name:isUserExist.name,
    //   customer_address:"Dhaka",
    //   customer_phone:"017777777",
    //   customer_city:"Old Dhaka",
    //   client_ip
    // }
    //  const payment = await orderUtils.makePayment(shurjopayPayload)
    return { result,
        // payment
    };
});
const getAllOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate('user').populate('product'), query)
        .filter()
        .sort()
        .paginate();
    const result = orderQuery.modelQuery;
    return result;
});
const getUserOrdersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ user: id }).populate('product');
    return result;
});
const getSpecificOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(id).populate({
        path: 'product',
        select: '-quantity -inStock',
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'There is no Order found');
    }
    return result;
});
const updateOrderIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderInfo = (yield order_model_1.Order.findById(id));
    if (!orderInfo) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'There is no User found');
    }
    if (orderInfo.status === order_constant_1.orderStatus.CANCELLED) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order is cancelled');
    }
    if (orderInfo.status === order_constant_1.orderStatus.DELIVERED) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order is delivered');
    }
    const result = yield order_model_1.Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield order_model_1.Order.findById(id))) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'There is no User found');
    }
    const result = yield order_model_1.Order.findByIdAndDelete(id, { new: true });
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    updateOrderIntoDB,
    deleteOrderFromDB,
    getAllOrdersFromDB,
    getSpecificOrderFromDB,
    getUserOrdersFromDB
};
exports.OrderServices = { createOrderIntoDB };
