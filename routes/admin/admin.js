import express from 'express';


import {
    Hostpendingrequest,
    HostApprovedrequest,
    HostRejectedrequest,
    hostApprovel,
    hostRejected,
    getHostData,
    adminLogin,
    getPaymentRequests,
    getBankDetails,
    paymentSucesss,
    getOrders,
    onSuggestionsFetchRequested,
    getdashBoard
} from '../../controllers/Admincontroller.js';
import { BlocktheHost } from '../../controllers/orderController.js';

import {AdminverifyToken} from '../../middlewares/authVerify.js'

const router = express.Router();

// GET-ROUTES
router.get('/pendingRequest',AdminverifyToken,Hostpendingrequest);
router.get('/ApprovedRequest',AdminverifyToken,HostApprovedrequest);
router.get('/rejectedRequest',AdminverifyToken,HostRejectedrequest);
router.get('/getHostdata',getHostData)
router.get('/getpaymentRequests',AdminverifyToken,getPaymentRequests)
router.get('/getBankDetails',AdminverifyToken,getBankDetails)
router.get('/getorders',AdminverifyToken,getOrders)
router.get('/getdashBoard',AdminverifyToken,getdashBoard)


//PATCH-ROUTES
router.post('/adminLogin',adminLogin)
router.post('/adminapprovel',AdminverifyToken,hostApprovel);
router.post('/adminrejected',AdminverifyToken,hostRejected);
router.post('/paymentSucesss',AdminverifyToken,paymentSucesss);
router.post('/suggestions',AdminverifyToken,onSuggestionsFetchRequested);
router.post('/blockhost',AdminverifyToken,BlocktheHost)







export default router;