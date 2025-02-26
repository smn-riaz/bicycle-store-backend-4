import  httpStatus  from 'http-status';
 
import  AppError  from "../../errors/AppError"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import QueryBuilder from '../../builder/QueryBuilder';
import { JwtPayload } from 'jsonwebtoken';




const createUser = async(payload:TUser) => {


    const isUserExists = await User.findOne({email:payload.email})

    if(isUserExists){
        throw new AppError(httpStatus.CONFLICT,'Email is already registered !')
    }

    
    const result = await User.create(payload)

    return result
}




const getAllUsers = async(query:Record<string,unknown>) => {
    
    const userQuery = new QueryBuilder(User.find(
        // {isActivated:true}
    ),query).filter().sort().paginate()

    const result = await userQuery.modelQuery

    return result
    
}


const getSpecificUser = async(user:JwtPayload) => {

    const {id, role} = user

    const result = await User.findById(id)

    if(!result) {
        throw new AppError(httpStatus.NOT_FOUND, "There is no User found")
    }

    if(role !== result.role){
        throw new AppError(httpStatus.NOT_FOUND, "There is no User found")
    }

   
     return result
    
}






const deactivateUser = async(id:string) => {

    const isUserExists = await User.findById(id)


    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,'No user is found !')
    }
    
    if(!(isUserExists?.isActivated)) {
        throw new AppError(httpStatus.NOT_FOUND,'This user is already Deactivated !')
    }

    const result = await User.findByIdAndUpdate(id,{isActivated:false},{new:true})
   
    return result
}


export const UserServices = {createUser,  deactivateUser, getAllUsers, getSpecificUser}