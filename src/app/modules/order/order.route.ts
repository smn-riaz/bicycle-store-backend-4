import { Router } from "express";
import { OrderControllers } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidations } from "./order.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router()



router.post('/create-order',
    auth(USER_ROLE.user),
validateRequest(OrderValidations.createOrderValidationSchema),
OrderControllers.createOrder)



router.get('/',auth(USER_ROLE.admin), OrderControllers.getAllOrders)


router.get('/user-order',auth(USER_ROLE.user), OrderControllers.getUserOrders)


 router.get('/:orderId',auth('admin'), OrderControllers.getSpecificOrder)


 router.patch('/:orderId',auth('admin'),validateRequest(OrderValidations.updateOrderValidationSchema), OrderControllers.updateOrder)

 router.delete('/:orderId',auth('admin'), OrderControllers.deleteOrder)




export const OrderRouters = router


