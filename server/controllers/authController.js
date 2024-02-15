const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const authHelper = require('../helper/authHelper')

// Register User
exports.registerController = async(req,res) =>{
    try {
        const {name,email,password,phone,address,answer} = req.body;
        if (!name){
            return res.send({message:"Name is required"})
        }
        if (!email){
            return res.send({message:"email is required"})
        }
        if (!password){
            return res.send({message:"password is required"})
        }
        if (!phone){
            return res.send({message:"phone is required"})
        }
        if (!address){
            return res.send({message:"address is required"})
        }
        if (!answer){
            return res.send({message:"answer is required"})
        }

        // check user
        const existingUser = await userModel.findOne({email});

        // exsting user
        if (existingUser){
            return res.status(400).send({
                success:false,
                message: 'Existing User'
            })
        }
        // Hash Password
        const hashedPassword = await authHelper.hashPassword(password);
        // Save user to database
        const user = new userModel({name,email,phone,address,password:hashedPassword,answer}).save();
        res.status(201).send({
            success:true,
            message:'User Registration Successful',
            user
        })
    } catch (error) {
        res.status(400).send({
            success : false,
            message : 'Error in Registration',
            error
        })
    }
}

// Login
exports.loginController = async(req,res) =>{
    try {
        const {email,password} = req.body

        // Validation
        if (!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        // check user
        const user  = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
                success:false,
                message:'Email is not registred'
            })
        }
        const match = await authHelper.comparePassword(password,user.password);
        if (!match) {
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        const token = await user.generateAuthtoken();
         // cookiegenerate
         res.cookie("usercookie",token,{
            expires:new Date(Date.now()+9000000),
            httpOnly:true
        });
        
        const result = {
            user:{
                _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            },
            token
        }
        if (!token) {
            return res.status(404).send({
                success:false,
                message:'Token Generation Failed'
            })
        }
        return res.status(200).send({
            success:true,
            message:'Login Successful',
            result
        })
    } catch (error) {
        
    }
}

// Forgot Password
exports.forgotPassController = async(req,res) =>{
    try {
        const {email,answer,newPassword} =req.body;
        if (!email){
            res.status(400).send({message:'Email is required'});
        }
        if (!answer){
            res.status(400).send({message:'Answer is required'});
        }
        if (!newPassword){
            res.status(400).send({message:'New Password is required'});
        }

        // check 
        const user = await userModel.findOne({email,answer});
        // validation
        if (!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer",
            })
        }
        const hashed = await authHelper.hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message : 'Password Reset Successfully'
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
}

// update profile
exports.updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);

        if (password && password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const hashedPassword = password ? await authHelper.hashPassword(password) : undefined;

        let updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password, 
            phone: phone || user.phone,
            address: address || user.address,
        }, { new: true });
        updatedUser ={
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            role: updatedUser.role,
            tokens: updatedUser.tokens,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        }
        res.status(200).send({
            success: true,
            message: "User details updated successfully",
            updatedUser
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Something went wrong in updating profile",
            error
        });
    }
};

// order
exports.getOrdersController =async(req,res) =>{
    try {
        const orders = await orderModel.find({ buyer: req.user._id })
        .populate('products', '-photo')
        .populate('buyer', 'name');
        res.json(orders);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong in getting orders",
            error
        });
    }
}

// all order
exports.getAllOrdersController =async(req,res) =>{
    try {
        const orders = await orderModel.find({})
        .populate('products', '-photo')
        .populate('buyer', 'name')
        .sort({createdAt:-1});
        res.json(orders);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong in getting orders",
            error
        });
    }
}
// order status 
exports.orderStatusController = async(req,res) =>{
    try {
        const orderId = req.params.orderId;
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
        res.json(order);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong in updating order status",
            error
        });
    }
}
