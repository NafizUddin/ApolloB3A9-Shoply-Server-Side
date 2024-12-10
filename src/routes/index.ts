import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/Users/user.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { ProductRoutes } from '../modules/Products/product.route';
import { RecentViewProductRoutes } from '../modules/Recent Products/recentProduct.route';
import { CouponRoutes } from '../modules/Coupon/coupon.route';

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
  {
    path: '/recent-products',
    route: RecentViewProductRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
