import { Router } from "express";
import { UserRouters } from "../modules/user/user.route";
import { ProductRouters } from "../modules/product/product.route";
import { OrderRouters } from "../modules/order/order.route";
import { AuthRouters } from "../modules/auth/auth.route";

const router = Router()

const moduleRoutes = [
    {
        path:'/users',
        route: UserRouters
    },
    {
        path:'/products',
        route: ProductRouters
    },
    {
        path:'/orders',
        route: OrderRouters
    },
    {
        path:'/auth',
        route: AuthRouters
    },
]


moduleRoutes.forEach((route) => 
router.use(route.path, route.route)
)




export default router