import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IAuthUser } from '../Users/user.interface';
import { ProductServices } from './product.services';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProduct(
    req.body,
    req.user as IAuthUser,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
