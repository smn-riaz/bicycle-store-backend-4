/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';

import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import AppError from '../errors/AppError';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;


    // checking if the token is missing
    if (!accessToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      accessToken,
      config.jwt_access_secret as string,
    ) as JwtPayload;


    const { id,role, email,iat} = decoded;
 

    // checking if the user is exist
    const user = await User.isUserExistsById(id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if(!(user?.isActivated)) {
      throw new AppError(httpStatus.NOT_FOUND,'This user is already Deactivated !')
  }



  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }




    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized !',
      );
    }

    req.user = decoded as JwtPayload & { role: string };

    next();

  });
};

export default auth;