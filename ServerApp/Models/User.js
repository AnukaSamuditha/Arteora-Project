const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        required:false
    },
    artworks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Artwork',
        def:[]
    }]
})

const User= mongoose.model('User',userSchema)

module.exports=User;