import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { UserValidation } from "../user/user.validation";

const router = Router()

router.post('/login',validateRequest(AuthValidations.loginValidationSchema),AuthControllers.login)


router.patch('/update-password',auth(USER_ROLE.admin, USER_ROLE.user),validateRequest(UserValidation.updatePasswordValidationSchema), AuthControllers.updatePassword)

router.post(
    '/refresh-token', validateRequest(AuthValidations.refreshTokenValidationSchema),AuthControllers.refreshToken
)

export const AuthRouters = router