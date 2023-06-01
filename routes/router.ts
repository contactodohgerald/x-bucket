import express from 'express'

//import controllers
import create from '../controllers/create.xtifiers.controller';
import siteDetails from '../controllers/sitedetails.controller';


const router = express.Router();

//
router.post('/create-xtifier', create.store)


router.post('/create-sitedetails', siteDetails.store)


export default router