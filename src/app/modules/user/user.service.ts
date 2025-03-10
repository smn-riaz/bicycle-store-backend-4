import  httpStatus  from 'http-status';
 
import  AppError  from "../../errors/AppError"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import QueryBuilder from '../../builder/QueryBuilder';




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
    ),query).filter()

    const result = await userQuery.modelQuery

    return result
    
}


const getSpecificUser = async(id:string) => {

    const result = await User.findById(id)

    if(!result) {
        throw new AppError(httpStatus.NOT_FOUND, "There is no User found")
    }

    if(result.role !== "user"){
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
        await User.findByIdAndUpdate(id,{isActivated:true},{new:true})
    }

    if((isUserExists?.isActivated)) {
        await User.findByIdAndUpdate(id,{isActivated:false},{new:true})
    }

    
}


export const UserServices = {createUser,  deactivateUser, getAllUsers, getSpecificUser}