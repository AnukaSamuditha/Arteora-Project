const mongoose=require('mongoose');

const artworkSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    publishedDate:{
        type:String,
        required:false
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrls:[{
        type:String,
        required:true,
        def:[]
    }],
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:false,
        def:'unsold'
    }
})

const Artwork=mongoose.model('Artwork',artworkSchema);

module.exports=Artwork;