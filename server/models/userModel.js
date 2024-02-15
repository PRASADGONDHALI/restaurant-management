const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        trim : true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("not valid email");
            }
        }
    },
    password :{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default: 0
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},{timestamps:true})

userSchema.methods.generateAuthtoken = async function (){
    try{
        let token23 = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        this.tokens = this.tokens.concat({token:token23});
        await this.save() ;
        return token23;    
    }
    catch(error){
        res.status(422).send({
            success:false,
            message:"Error in token genetation",
            error
        })
    }
    }
    


const users = mongoose.model('users', userSchema);

module.exports = users;
