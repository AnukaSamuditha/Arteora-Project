const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    artworkId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Artwork',
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    buyerName:{
        type:String,
        required:true
    },
    artworkName:{
        type:String,
        required:true
    }
})

const Order=mongoose.model('Order',orderSchema);
module.exports=Order;