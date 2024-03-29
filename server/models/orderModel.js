const mongoose = require('mongoose');


const  orderSchema = new mongoose.Schema({
    products : [{
        type:mongoose.ObjectId,
        ref:'products'
    }],
    payment :{} ,
    buyer :{
        type:mongoose.ObjectId,
        ref:'users'
    },
    status :{
        type : String,
        default : "Not Process",
        enum : ['Not Process','Processing','Shipped','Delivered','Cancelled'],
    },

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order