import httpStatus from 'http-status';
import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';


const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createUser(req.body);
 

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User is created successfully',
    data: result,
  });
});



const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers(req.query);


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users are retrived successfully',
    data: result,
  });
});



const getSpecificUser: RequestHandler = catchAsync(async (req, res) => {

  const result = await UserServices.getSpecificUser(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is retrived successfully',
    data: result,
  });
});







const deactivateUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;

 const user = await UserServices.deactivateUser(userId)

 const userInfo = {name: user?.name, email: user?.email, role: user?.role, isActivated: user?.isActivated}

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is deactivated successfully',
    data: userInfo,
  });
});



export const UserController = {
  createUser,
  getSpecificUser,
  deactivateUser,
  getAllUsers,
};
