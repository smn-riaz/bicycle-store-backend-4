import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createProduct: RequestHandler = catchAsync(async (req, res) => {

  const result = await ProductServices.createProductIntoDB(req.file, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product is created successfully',
    data: result,
  });
});




const getAllProducts: RequestHandler = catchAsync(async (req, res) => {

  const result = await ProductServices.getAllProductsFromDB(req.query);


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products are retrived successfully',
    data: result,
  });
});




const getSpecificProduct: RequestHandler = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.getSpecificProductFromDB(productId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product is retrived successfully',
    data: result,
  });
});




const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const { productId } = req.params;


  const result = await ProductServices.updateProductIntoDB(productId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product is updated successfully',
    data: result,
  });
});




const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.deleteProductFromDB(productId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product is deleted successfully',
    data: result,
  });
});




export const productController = {
  createProduct,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
