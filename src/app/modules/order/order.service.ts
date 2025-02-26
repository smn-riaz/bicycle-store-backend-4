import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import  AppError  from '../../errors/AppError';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { User } from '../user/user.model';
import Product from '../product/product.model';
import { JwtPayload } from 'jsonwebtoken';
// import { orderUtils } from './order.utils';


const createOrderIntoDB = async (payload: TOrder,
  // client_ip:string
) => {
  const { user, product, quantity } = payload;

  const isUserExist = await User.findById(user)

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no User found');
  }

  const isProductExist = await Product.findById(product);

  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no Product found');
  }

  if (isProductExist.quantity < 1 || !isProductExist.inStock) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no product in stock');
  }

  if (isProductExist.quantity < quantity) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Your order amount exceeds the available stock'
    );
  }

  const result = await Order.create(payload);

  if (result) {
    await Product.findByIdAndUpdate(
      product,
      [
        {
          $set: {
            quantity: { $subtract: ['$quantity', quantity] },
            inStock: {
              $gt: [{ $subtract: ['$quantity', quantity] }, 0],
            },
          },
        },
      ],

      { new: true }
    );
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

  return {result, 
    // payment
  };
};



const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find(),
    query
  )
    .filter()
    .sort()
    .paginate();

  const result = orderQuery.modelQuery;
  return result;
};


const getUserOrdersFromDB = async (user:JwtPayload) => {

  const {id} = user

  const result = await Order.find({user:id}).populate('product');

  return result;
};



const getSpecificOrderFromDB = async (id: string) => {
  const result = await Order.findById(id).populate({
    path: 'product',
    select: '-quantity -inStock', 
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no Order found');
  }

  return result;
};




const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  if (!(await Order.findById(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no User found');
  }

  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const deleteOrderFromDB = async (id: string) => {
  if (!(await Order.findById(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'There is no User found');
  }

  const result = await Order.findByIdAndDelete(id, { new: true });

  return result;
};

export const orderServices = {
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
  getAllOrdersFromDB,
  getSpecificOrderFromDB,
  getUserOrdersFromDB
};

export const OrderServices = { createOrderIntoDB };
