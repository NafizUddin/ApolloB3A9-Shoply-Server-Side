import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

// router.get('/', OrderControllers.getAllOrders);

export const OrderRoutes = router;
