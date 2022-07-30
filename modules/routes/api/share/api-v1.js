import express from 'express';
//auth
import verifyOtpController from "../../../controllers/api/v1/shareController/auth/verifyOtpController.js";
//who
import whoController from '../../../controllers/api/v1/shareController/whoController.js';
//profile 
import readProfileController from '../../../controllers/api/v1/shareController/profile/readController.js';
import updateProfileController from '../../../controllers/api/v1/shareController/profile/updateController.js';
//car 
import typeCarController from '../../../controllers/api/v1/shareController/car/TypeController.js'
import modelCarController from '../../../controllers/api/v1/shareController/car/modelController.js'
import tipCarController from '../../../controllers/api/v1/shareController/car/tipController.js'

//middleware
import allowLoggedIn from '../../middlewares/allow-loggedIn-middleware.js'
import grantAccess from '../../middlewares/grant-access-middleware.js'
//const 
import { TYPE_PERMISSION } from "../../../helpers/const.js";
import { TYPE_RESOURCE } from "../../../helpers/const.js";
import checkRoleMiddleware from '../../middlewares/check-role-middleware.js';
const router = express.Router();

//auth
const authRouter = express.Router();
authRouter.post('/verifyOTP', verifyOtpController.verifyOTP.bind(verifyOtpController));
router.use('/auth' , authRouter);

//who
router.get('/whoAmI', allowLoggedIn, whoController.whoAmI.bind(whoController));

//profile
const profileRouter = express.Router();
profileRouter.get('/', allowLoggedIn, grantAccess(TYPE_PERMISSION.READ, TYPE_RESOURCE.PROFILE), readProfileController.getProfile.bind(readProfileController));
profileRouter.put('/update', allowLoggedIn, grantAccess(TYPE_PERMISSION.READ, TYPE_RESOURCE.PROFILE), updateProfileController.updateProfile.bind(updateProfileController));
router.use('/profile' , profileRouter);

//car 
const carRouter = express.Router();
carRouter.get('/getType'  ,  typeCarController.getTypes.bind(typeCarController));
carRouter.get('/getModel'  ,  modelCarController.getModels.bind(modelCarController));
carRouter.get('/getTip'  ,  tipCarController.getTips.bind(tipCarController));
router.use('/cars' , carRouter);


export default router