/* eslint-disable @typescript-eslint/no-explicit-any */
import  httpStatus  from 'http-status';
 
import QueryBuilder from "../../builder/QueryBuilder"

import { TProduct } from "./product.interface"
import Product from "./product.model"
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { imageName } from '../../constant/imageName';
import AppError from '../../errors/AppError';
import { productSearchableFields } from './product.constant';


const createProductIntoDB = async(file:any, payload:TProduct) => {

    const imgName = `${imageName()}${payload.name.replace(/\s/g,'')}`
    const path = file?.path
    

const {secure_url}:any = await sendImageToCloudinary(imgName,path)

payload.image = secure_url

    const result = await Product.create(payload)
    return result
}


 
const getAllProductsFromDB = async(query:Record<string,unknown>) => {
    
    const productQuery = new QueryBuilder(Product.find() 
    ,query)
    .search(productSearchableFields)
    .filter()

    const result = productQuery.modelQuery
    return result
    
}


const getSpecificProductFromDB = async(id:string) => {

    const result = await Product.findById(id) 
    
    if(!result) {
        throw new AppError(httpStatus.NOT_FOUND, "There is no Product found")
    }

     return result
    
}


const updateProductIntoDB = async(id:string,payload:Partial<TProduct>) => {

    if(!await Product.findById(id)) {
        throw new AppError(httpStatus.NOT_FOUND, "There is no Product found")
    }

    const result = await Product.findByIdAndUpdate(id, payload,{ new: true, runValidators:true } )

    return result
}


const deleteProductFromDB = async(id:string) => {

    if(!await Product.findById(id)) {
        throw new AppError(httpStatus.NOT_FOUND, "There is no User found")
    }

    const result = await Product.findByIdAndDelete(id,{new:true})

    return result
}



export const ProductServices = {createProductIntoDB,updateProductIntoDB,deleteProductFromDB,getAllProductsFromDB,getSpecificProductFromDB}