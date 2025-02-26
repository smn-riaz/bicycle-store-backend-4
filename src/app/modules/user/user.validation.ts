import { z } from "zod";

const createUserValidationSchema = z.object({
    body:z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.string(),
        role:z.enum(['user','admin']),
        isActivated:z.boolean(),
        needsPasswordChange:z.boolean()
    })
})

const updatePasswordValidationSchema = z.object({
    body:z.object({
        oldPassword:z.string(),
        newPassword:z.string()
    })
})


export const UserValidation = {createUserValidationSchema, updatePasswordValidationSchema}