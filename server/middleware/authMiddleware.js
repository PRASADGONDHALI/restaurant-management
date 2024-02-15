const jwt  = require('jsonwebtoken');
const userModel = require('../models/userModel')

// Protected Route 
exports.requireSignIn = async(req,res,next) =>{
    try {
        const token = req.headers.authorization
        if (!token){
            return res.status(401).send({
                success:false,
                error:'Authorization token is required',
            })
        }
        const decode  = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).send({
            success:false,
            message:'Error in token verifying',
            error
        })
    }
}

// admin access protected routes
exports.isAdmin = async(req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success : false,
                message : "Unauthorized token"
            })
        }else{
            next()
        }
    } catch (error) {
        res.status(401).send({
            success:false,
            message:'Error in admin middleware',
            error
        })
    }
}