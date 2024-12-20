"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.getAllUsers);
router.get('/me', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), user_controller_1.userController.getMyProfile);
router.get('/get-vendor/:vendorId', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), user_controller_1.userController.getVendorUser);
router.get('/get-customer/:email', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), user_controller_1.userController.getCustomerUser);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.userValidation.createUser), user_controller_1.userController.createAdmin);
router.post('/create-vendor', (0, validateRequest_1.default)(user_validation_1.userValidation.createUser), user_controller_1.userController.createVendor);
router.post('/create-customer', (0, validateRequest_1.default)(user_validation_1.userValidation.createUser), user_controller_1.userController.createCustomer);
router.post('/follow', (0, auth_1.default)(client_1.UserRole.CUSTOMER), user_controller_1.userController.followVendor);
router.delete('/unfollow', (0, auth_1.default)(client_1.UserRole.CUSTOMER), user_controller_1.userController.unfollowVendor);
router.patch('/update-customer', (0, auth_1.default)(client_1.UserRole.CUSTOMER), user_controller_1.userController.updateCustomer);
router.patch('/update-vendor', (0, auth_1.default)(client_1.UserRole.VENDOR), user_controller_1.userController.updateVendor);
router.patch('/block-user/:email', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.blockUser);
router.patch('/unblock-user/:email', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.unblockUser);
// router.patch(
//   '/:id/status',
//   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//   validateRequest(userValidation.updateStatus),
//   userController.changeProfileStatus,
// );
exports.UserRoutes = router;
