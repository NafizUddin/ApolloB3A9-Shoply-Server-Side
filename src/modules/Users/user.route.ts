import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// router.get(
//   '/',
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//   userController.getAllFromDB,
// );

router.get(
  '/me',
  auth(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.VENDOR,
    UserRole.CUSTOMER,
  ),
  userController.getMyProfile,
);

router.post(
  '/create-admin',
  validateRequest(userValidation.createAdmin),
  userController.createAdmin,
);

router.post(
  '/create-vendor',
  validateRequest(userValidation.createAdmin),
  userController.createVendor,
);

router.post(
  '/create-customer',
  validateRequest(userValidation.createAdmin),
  userController.createCustomer,
);

// router.patch(
//   '/:id/status',
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//   validateRequest(userValidation.updateStatus),
//   userController.changeProfileStatus,
// );

// router.patch(
//   '/update-my-profile',
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
//   fileUploader.upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     return userController.updateMyProfie(req, res, next);
//   },
// );

export const UserRoutes = router;
