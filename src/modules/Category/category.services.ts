import prisma from '../../utils/prisma';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createCategory = async (payload: { category: string; image: string }) => {
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      name: payload.category,
    },
  });

  if (isCategoryExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category already exists!');
  }

  const result = await prisma.category.create({
    data: {
      name: payload.category,
      image: payload.image,
    },
  });

  return result;
};

export const CategoryServices = {
  createCategory,
};
