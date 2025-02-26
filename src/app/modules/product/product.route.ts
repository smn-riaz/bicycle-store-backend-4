import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';
import { productController } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();


router.post(
  '/create-product',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidation.createProductValidationSchema),
  productController.createProduct
);


router.get('/', auth(USER_ROLE.admin), productController.getAllProducts);


router.get(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  productController.getSpecificProduct
);


router.patch(
  '/:productId',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductValidationSchema),
  productController.updateProduct
);


router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductValidationSchema),
  productController.deleteProduct
);


export const ProductRouters = router;
