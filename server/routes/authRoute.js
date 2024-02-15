const express = require('express');
const router = new express.Router() ;
const authController = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');

// Registration
router.post('/register',authController.registerController)

// Login
router.post('/login',authController.loginController)

// Forgot Password
router.post('/forgot-password',authController.forgotPassController)

// Protected User Routes
router.get('/user-auth',requireSignIn,(req,res) =>{
    res.status(200).send({ ok : true });
})

// Protected Admin Routes
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) =>{
    res.status(200).send({ ok : true });
})

// update profile
router.put('/profile',requireSignIn,authController.updateProfileController)
// orders 
router.get('/orders',requireSignIn,authController.getOrdersController)
// all orders 
router.get('/all-orders',requireSignIn,isAdmin,authController.getAllOrdersController)
// all orders status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,authController.orderStatusController)

module.exports = router


