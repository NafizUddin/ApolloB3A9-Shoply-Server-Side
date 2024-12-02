import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import config from '../../config';
import { IAuthUser } from './user.interface';

const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdmin(req.body);
  const { refreshToken, accessToken, newUser } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    token: accessToken,
    data: newUser,
  });
});

const createVendor = catchAsync(async (req, res) => {
  const result = await userService.createVendor(req.body);

  const { refreshToken, accessToken, newUser } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vendor created successfully!',
    token: accessToken,
    data: newUser,
  });
});

const createCustomer = catchAsync(async (req, res) => {
  const result = await userService.createCustomer(req.body);

  const { refreshToken, accessToken, newUser } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer created successfully!',
    token: accessToken,
    data: newUser,
  });
});

// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   // console.log(req.query)
//   const filters = pick(req.query, userFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

//   const result = await userService.getAllFromDB(filters, options);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Users data fetched!',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await userService.changeProfileStatus(id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Users profile status changed!',
//     data: result,
//   });
// });

const getMyProfile = catchAsync(async (req, res) => {
  const result = await userService.getMyProfile(req.user as IAuthUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My profile data fetched!',
    data: result,
  });
});

// const updateMyProfie = catchAsync(
//   async (req: Request & { user?: IAuthUser }, res: Response) => {
//     const user = req.user;

//     const result = await userService.updateMyProfie(user as IAuthUser, req);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'My profile updated!',
//       data: result,
//     });
//   },
// );

export const userController = {
  createAdmin,
  createVendor,
  createCustomer,
  //   getAllFromDB,
  //   changeProfileStatus,
  getMyProfile,
  //   updateMyProfie,
};
