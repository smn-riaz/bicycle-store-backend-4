import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required: true
},
product:{
    type:Schema.Types.ObjectId,
    ref:'Product',
    required: true
},
quantity:{type:Number, required:[true, "Please enter the quantity"], 
    validate: {
        validator: function (value) {
          return (typeof value === 'number' && value > 0);
        },
        message: "{VALUE} is not a valid quantity. Quantity must be greater than 0"
      }
},

totalPrice:{type:Number, required:[true, "Please enter the total price"], 
    validate: {
        validator: function (value) {
          return (typeof value === 'number' && value > 0);
        },
        message: "{VALUE} is not a valid price. Price must be greater than 0"
      }
},
status:{
  type:String,
  enum:["pending" , "shipped" , "delivered" , "canceled"],
  default:"pending"
}
})


export const Order = model<TOrder>('Order', orderSchema)