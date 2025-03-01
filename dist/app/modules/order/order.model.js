"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: { type: Number, required: [true, "Please enter the quantity"],
        validate: {
            validator: function (value) {
                return (typeof value === 'number' && value > 0);
            },
            message: "{VALUE} is not a valid quantity. Quantity must be greater than 0"
        }
    },
    totalPrice: { type: Number, required: [true, "Please enter the total price"],
        validate: {
            validator: function (value) {
                return (typeof value === 'number' && value > 0);
            },
            message: "{VALUE} is not a valid price. Price must be greater than 0"
        }
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
