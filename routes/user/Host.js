import express from 'express';

import {
    hostStructure,
    hostfloorPlan,
    hostTitle,
    hostDescription,
    hostAddDesc,
    hostAmenities,
    hostImages,
    hostPrice,
    hostLocation,
    HostVerify,
    HostPhotoverify,
    getHostVerification_list,
    getSingledata,
    getHostDetails,
    
    
} from '../../controllers/HostController.js';

import {
    HostAddress,
    HostBanksetup,
    
} from '../../controllers/setHostDetails.js';

import {
    OrderData
} from '../../controllers/orderController.js'

import { verifyToken } from '../../middlewares/authVerify.js';
import upload from '../../middlewares/s3_multer.js';


const router = express.Router();



router.post('/host',verifyToken,hostStructure)
router.post('/floorplan',verifyToken,hostfloorPlan)
router.post('/title',verifyToken,hostTitle)
router.post('/description',verifyToken,hostDescription)
router.post('/AddDes',verifyToken,hostAddDesc)
router.post('/location',verifyToken,hostLocation)
router.post("/amenties",verifyToken,hostAmenities)
router.post("/Images",upload.array("image"),verifyToken,hostImages)
router.post("/Price",verifyToken,hostPrice)
router.post('/hostAddress',verifyToken,HostAddress)
router.post('/BankDetails',verifyToken,HostBanksetup)
router.post('/HostVerify',verifyToken,HostVerify)
router.post('/HostphotoVerify',verifyToken,HostPhotoverify)
router.post('/orderDetails',verifyToken,OrderData)



//get -requests ....
router.get('/getdata',getSingledata)
router.get('/gethostdetails',verifyToken,getHostDetails)
router.get('/gethostverification',verifyToken,getHostVerification_list)





export default router;
