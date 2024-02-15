const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () =>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        
    }
}

module.exports = connectDB;