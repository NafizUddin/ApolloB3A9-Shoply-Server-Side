import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import prisma from '../../utils/prisma';
import { IAuthUser } from '../Users/user.interface';

const createRecentProducts = async (
  payload: { productId: string },
  user: IAuthUser,
) => {
  const customer = await prisma.customer.findUnique({
    where: {
      email: user?.email,
      isDeleted: false,
    },
  });

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: payload.productId,
      isDeleted: false,
    },
  });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const recentProduct = await prisma.recentProductView.create({
    data: {
      customerId: customer.id,
      productId: product.id,
    },
    include: {
      customer: true,
      product: true,
    },
  });

  return recentProduct;
};

const getAllRecentProducts = async () => {
  const result = await prisma.recentProductView.findMany();
  return result;
};

export const RecentProductViewServices = {
  createRecentProducts,
  getAllRecentProducts,
};
