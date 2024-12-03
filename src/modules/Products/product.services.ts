import prisma from '../../utils/prisma';
import { IAuthUser } from '../Users/user.interface';
import { TProducts } from './product.interface';

const createProduct = async (payload: TProducts, user: IAuthUser) => {
  const vendor = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isDeleted: false,
    },
  });

  await prisma.category.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  });

  const productInfo = {
    ...payload,
    vendorId: vendor.id,
  };

  const result = await prisma.product.create({
    data: productInfo,
    include: {
      category: true,
      vendor: true,
    },
  });

  return result;
};

export const ProductServices = {
  createProduct,
};
