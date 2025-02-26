import z from 'zod'

const createOrderValidationSchema = z.object({
    body:z.object({
        user:z.string({required_error:'User is required'}),
        product:z.string({required_error:'Product is required'}),
        quantity:z.number({required_error:'Quantity is required & must be number'}).positive({message:"Quantity must be greater than 0"}),
        totalPrice:z.number().positive({message:"Total Price must be greater than 0"}),
        status:z.enum(["pending" , "shipped" , "delivered" , "canceled"])
    })
})


const updateOrderValidationSchema = z.object({
    body:z.object({
        status:z.enum(["pending" , "shipped" , "delivered" , "canceled"])
    })
})



export const OrderValidations = {createOrderValidationSchema, updateOrderValidationSchema}