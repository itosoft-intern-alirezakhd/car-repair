import express from "express"
//auth 
import  registerController from '../../../controllers/api/v1/publicController/auth/registerController.js'
import whoController from '../../../controllers/api/v1/publicController/auth/whoController.js'
import loginController from '../../../controllers/api/v1/publicController/auth/loginController.js'
import verifyOtpController from "../../../controllers/api/v1/superAdminController/auth/verifyOtpController.js";
//profile
import profileController from "../../../controllers/api/v1/publicController/profile/profileController.js";
//car
import  carController from '../../../controllers/api/v1/publicController/car/carController.js'
//user
import  userController from '../../../controllers/api/v1/adminController/user/userController.js'

//import middleware
import allowLoggedIn from '../../middlewares/allow-loggedIn-middleware.js'
import grantAccess from '../../middlewares/grant-access-middleware.js'

import { TYPE_PERMISSION } from "../../../helpers/const.js";
import { TYPE_RESOURCE } from "../../../helpers/const.js";

//Router
const router = express.Router();

router.get('/whoAmI', allowLoggedIn, whoController.whoAmI.bind(whoController));

//auth 
const authRouter = express.Router();
authRouter.post('/signup', registerController.signUp.bind(registerController) );
authRouter.post('/login', loginController.login.bind(loginController));
authRouter.post('/loginWithOTP', loginController.loginWithOTP.bind(loginController));
authRouter.post('/verifyOTP', verifyOtpController.verifyOTP.bind(verifyOtpController));
router.use('/auth' , authRouter);

//profile 
const profileRouter = express.Router();
profileRouter.get('/', allowLoggedIn, grantAccess(TYPE_PERMISSION.READ, TYPE_RESOURCE.PROFILE), profileController.profile.bind(profileController));
router.use('/profile' , profileRouter);

// //User
// const userRouter = express.Router();
// userRouter.post('/getAll', allowLoggedIn, grantAccess(TYPE_PERMISSION.READ,  TYPE_RESOURCE.USER), userController.getUsers.bind(userController));
// userRouter.post('/create', allowLoggedIn, grantAccess(TYPE_PERMISSION.CREATE, TYPE_RESOURCE.USER), userController.createUser.bind(userController));
// userRouter.put('/update', allowLoggedIn, grantAccess(TYPE_PERMISSION.UPDATE, TYPE_RESOURCE.USER), userController.updateUser.bind(userController));
// userRouter.delete('/delete', allowLoggedIn, grantAccess(TYPE_PERMISSION.DELETE, TYPE_RESOURCE.USER), userController.deleteUser.bind(userController));
// router.use('/users' , userRouter);

// //Role
// const roleRouter = express.Router();
// roleRouter.post('/create', allowLoggedIn , grantAccess(TYPE_PERMISSION.CREATE, TYPE_RESOURCE.ROLE), roleController.addRole.bind(roleController));
// roleRouter.post('/getAll', allowLoggedIn, grantAccess(TYPE_PERMISSION.READ, TYPE_RESOURCE.ROLE), roleController.getRoles.bind(roleController));
// roleRouter.put('/update', allowLoggedIn, grantAccess(TYPE_PERMISSION.UPDATE, TYPE_RESOURCE.ROLE), roleController.updateRole.bind(roleController));
// roleRouter.delete('/delete', allowLoggedIn, grantAccess(TYPE_PERMISSION.DELETE, TYPE_RESOURCE.ROLE), roleController.deleteRole.bind(roleController));
// roleRouter.get('/distinct', allowLoggedIn, grantAccess(TYPE_PERMISSION.READ, TYPE_RESOURCE.ROLE), roleController.distinct.bind(roleController));
// router.use('/roles' , roleRouter);

//Car
const carRouter = express.Router();
carRouter.post('/create', allowLoggedIn, carController.addCar.bind(carController))
carRouter.post('/getAll', allowLoggedIn, carController.getAll.bind(carController))
carRouter.put('/update', allowLoggedIn, carController.updateCar.bind(carController))
carRouter.delete('/delete', allowLoggedIn, carController.deleteCar.bind(carController))
router.use('/cars' , carRouter);

export default router