import { Router } from "express";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router()

router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers)

router.post('/create-user',validateRequest(UserValidation.createUserValidationSchema), UserController.createUser)

router.get('/:id',auth( USER_ROLE.user), UserController.getSpecificUser)



router.delete('/deactivate-user/:userId',auth(USER_ROLE.admin), UserController.deactivateUser)



export const UserRouters = router