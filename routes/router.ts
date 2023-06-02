import express from 'express'
import verifyLoginToken from '../middleware/verify.token';
import userRoles from '../middleware/user.role';

//import controllers
import register from '../controllers/create.xtifiers.controller';
import login from '../controllers/login.xtifiers.controller';
import siteDetails from '../controllers/sitedetails.controller';
import users from '../controllers/user.controller';
import proccess from '../controllers/process.controller';


const router = express.Router();

//
router.post('/create-xtifier', register.store)
router.post('/login-xtifier', login.store)

router.post('/create-sitedetails', verifyLoginToken, userRoles, siteDetails.store)

//user section
router.get('/get-logged-user', verifyLoginToken, users.getLoggedInUser)
router.put('/update-avatar', verifyLoginToken, users.updateAvatar)

//process core function
router.post('/process-search', verifyLoginToken, proccess.coreFunctionHanlder)

export default router