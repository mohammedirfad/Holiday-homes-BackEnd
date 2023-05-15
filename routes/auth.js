import express from 'express';

import {
    userAuth,
    OtpVerify,
    Signup,
    googleAuth,
    getUser,
    getMyBookings
} from '../controllers/auth.js';

import {
    OrderCancell,
    OrderStatus,
    paymentRequest,
    complaintRegister,

} from '../controllers/orderController.js'

import {verifyToken} from '../middlewares/authVerify.js'

const router = express.Router();



router.post('/otp-verify',OtpVerify)
router.post('/login',userAuth);
router.post('/signup',Signup)
router.post('/google-Auth',googleAuth);
router.post('/canelbooking',verifyToken,OrderCancell)
router.post('/hostPayment',verifyToken,paymentRequest)
router.post('/complaintRegister',verifyToken,complaintRegister)


router.get('/users',getUser);

router.get("/myBookings",getMyBookings);
router.get("/orderstatus",verifyToken,OrderStatus)





export default router;


