const express=require('express');
const cors=require('cors');
const app=express();
const mongoose =require('mongoose');
const User =require('./Models/User');
const multer=require('multer');
const {v4:uuidv4}=require('uuid');
const path=require('path');
const Artwork =require('./Models/Artwork');

app.use(express.json())
app.use(cors())

const DB='mongodb+srv://anukasamuditha:a2vNB4ztKWz1ofa1@aretora-cluster.ykm8b.mongodb.net/Arteora?retryWrites=true&w=majority&appName=Aretora-Cluster'

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected");
}).catch((error)=>{
    console.log("Database is not connected");
})
app.use('/uploads/',express.static(path.join(__dirname,'uploads')));

app.post('/create-user',async(req,res)=>{
    const {username,password,email}=req.body

    const user=new User({
        username,
        email,
        password
    })

    try{
        await user.save()
        res.status(201).json({
            message:"User account created successfully",
            data:user
        })
    }catch(err){
        res.status(500).json({
            status:"Failure",
            error:err
        })
    }
})

app.get('/get-user/:userId',async(req,res)=>{
    const userID=req.params.userId;

    try{
        const user=await User.findById(userID);

        if(user){
            res.status(200).json({
                status:"success",
                user:user
            })
        }else{
            res.status(404).json({
                status:"Failed",
                message:"seller not found"
            })
        }
    }catch(err){
        res.status(500).json({
            status:"Failure",
            message:"Error fetching the user",
            error:err
        })
    }
})

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,uuidv4() + '-'+file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    const allowedFileTypes=['image/png','image/jpg','image/jpeg'];

    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

let upload=multer({storage,fileFilter})

app.put('/update-user/:userId',upload.single('profilePhoto'), async (req,res)=>{
    const userID=req.params.userId;

    const profilePhoto=req.file.filename;

    try{
        const user=await User.findById(userID);

        if(!user){
            return res.status(404).json({
                status:"Failed",
                message:"user not found"

            })
        }

        user.profilePhoto=profilePhoto;
        await user.save();

        res.status(200).json({
            status:"success",
            message:"Profile photo uploaded successfully",
            user:user
        });
    }catch(error){
        res.status(500).json({
            status:'Failed',
            message:"There was an error in uploadin the profile photo",
            err:error.message
        })
    }
});

app.post('/create-artwork',upload.array('imageUrls',5), async(req,res)=>{
    const {name,publishedDate,author,price,category,description}=req.body;

    const imageUrls=req.files.map((file)=>file.filename)

    const artwork=new Artwork({
        name,
        publishedDate,
        author,
        price,
        category,
        description,
        imageUrls
    })

    try{
        const savedArtwork=await artwork.save()

        const user=await User.findById(author);

        if(!user){
            return res.status(404).json({
                status:"",
                message:"User not found"
            })
        }
        user.artworks=[...user.artworks,savedArtwork._id];
        await user.save();

        res.status(200).json({
            status:"Success",
            data:savedArtwork
        })
    }catch(error){
        res.status(500).json({
            status:"Failed",
            err:`error creating the artwork,${error.message}`
        });
    }

   
});

app.post('/get-user-artworks',async (req,res)=>{
    const {artworks}=req.body;

    try{
        const userArtworks= await Artwork.find({_id:{$in:artworks}});
        res.status(200).json({
            status:"success",
            data:userArtworks
        })
    }catch(error){
        res.status(500).json({
            status:"failed",
            error:error
        })
    }
});

app.get('/get-artwork/:id',async (req,res)=>{
    const artworkId = req.params.id;

    try{
        const artwork=await Artwork.findById(artworkId);
        if(artwork){
            res.status(200).json({
                status:'success',
                data:artwork
            })
        }
    }catch(error){
        res.status(500).json({
            status:'failed',
            error:error
        })
    }
})

app.get('/get-artworks',async(req,res)=>{
    try{
        const artworks=await Artwork.find({});
        if(artworks.length > 0){
            res.status(200).json({
                status:"success",
                artworks:artworks
            })
        }
    }catch(err){
        res.status(500).json({
            status:"failed",
            error:err
        })
    }
})

app.delete('/delete-artwork/:artworkId',async (req,res)=>{
    const {artworkId}=req.params;

    try{
        if(artworkId){
            const artwork=await Artwork.findByIdAndDelete(artworkId);
            res.status(200).json({
                status:'success',
                data:{}
            })

        }
    }catch(err){
        res.status(500).json({
            status:'failed',
            error:err
        })
    }

});

app.listen(5000,()=>{
    console.log("Server is running...");
})

