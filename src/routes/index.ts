import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/Users/user.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { ProductRoutes } from '../modules/Products/product.route';

const router = Router();

const moduleRouter = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
