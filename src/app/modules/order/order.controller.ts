import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { orderServices, OrderServices } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'

const createOrder:RequestHandler = catchAsync(async(req,res) => {

 const result = await OrderServices.createOrderIntoDB(req.body
)

sendResponse(res, {
        success:true, 
        statusCode:httpStatus.OK,
        message:"Order placed successfully",
        data:result
})

})




const getAllOrders: RequestHandler = catchAsync(async (req, res) => {

        const result = await orderServices.getAllOrdersFromDB(req.query)    
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'orders are retrived successfully',
          data: result,
        });
      });




const getUserOrders: RequestHandler = catchAsync(async (req, res) => {

  const {id} = req.params

        const result = await orderServices.getUserOrdersFromDB(id);
   
      
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'Your Orders are retrived successfully',
          data: result,
        });
      });
      
      
      
      
      
const getSpecificOrder: RequestHandler = catchAsync(async (req, res) => {
        const { orderId } = req.params;
      
        const result = await orderServices.getSpecificOrderFromDB(orderId);
      
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'Order is retrived successfully',
          data: result,
        });
      });
      
      
      
      
const updateOrder: RequestHandler = catchAsync(async (req, res) => {
        const { orderId } = req.params;
      
        const result = await orderServices.updateOrderIntoDB(orderId, req.body);
      
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'order is updated successfully',
          data: result,
        });
      });
      
      
      
      
const deleteOrder: RequestHandler = catchAsync(async (req, res) => {
        const { orderId } = req.params;
      
        const result = await orderServices.deleteOrderFromDB(orderId);
      
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: 'order is deleted successfully',
          data: result,
        });
      });


     




export const OrderControllers = {
        createOrder,updateOrder,deleteOrder,getAllOrders,getSpecificOrder, getUserOrders, 
       
}