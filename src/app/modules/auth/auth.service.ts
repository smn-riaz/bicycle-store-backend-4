import  httpStatus  from 'http-status';
import AppError  from "../../errors/AppError"
import { User } from "../user/user.model"
import bcrypt from 'bcrypt'
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';
import { TPasswordUpdate } from '../user/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';



const login = async(payload:TLoginUser) => {

    const user = await User.findOne({email:payload.email})


    if(!user) {
        throw new AppError(httpStatus.NOT_FOUND, "No user is found")
    }

    if(!(user?.isActivated)) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is deactivated")
    }



    if(!await User.isPasswordMached(payload.password, user.password)) {
        throw new AppError(httpStatus.NOT_FOUND, "Wrong password, Try again")
    }


    // create token and send to the client
    const jwtPayload = {
        id:user._id,
        email: user.email,
        role:user.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    )


    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    )


    return {
        accessToken,refreshToken, user
    }

 

}



const updatePassword = async(userData:JwtPayload,payload:TPasswordUpdate) => {

    const user = await User.findById(userData.id)


    
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "No user found")
    }

    if(!(user?.isActivated)) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is deactivated")
    }

    if(!await User.isPasswordMached(payload.oldPassword,user.password)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Previous password doesn't match")
    }



    const hashedNewPassword = await bcrypt.hash(payload.newPassword,Number(config.bcrypt_salt_rounds))

    const result = await User.findByIdAndUpdate(user.id,{password:hashedNewPassword, needsPasswordChange:false, passwordChangedAt:new Date()},{new:true} )

    return result
}




const refreshToken = async(refreshToken:string) => {

      // checking if the token is missing
      if (!refreshToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
  
      // checking if the given token is valid
      const decoded = jwt.verify(
        refreshToken,
        config.jwt_refresh_secret as string,
      ) as JwtPayload;
  
  
      const { id, iat, email,role} = decoded;
   
  
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




    const jwtPayload = {
        id,
        email,
        role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    )

    return {accessToken}

}





export const AuthServices = {login, updatePassword, refreshToken}