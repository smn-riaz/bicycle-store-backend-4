/* eslint-disable no-unused-vars */

import { Model } from "mongoose"
import { USER_ROLE } from "./user.constant"

export type TUser = {
_id?:string
name:string
email:string
password:string
role: "user" | "admin"
isActivated:boolean
needsPasswordChange:boolean
passwordChangedAt?: Date
}

export type TPasswordUpdate = {
    oldPassword:string
    newPassword:string
}


export interface UserModel extends Model<TUser> {

    isUserExistsById(email:string):Promise<TUser>
    isPasswordMached(plainTextpassword:string,hashedPassword:string): Promise<boolean>

    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
      ): boolean;

}


export type TUserRole = keyof typeof USER_ROLE