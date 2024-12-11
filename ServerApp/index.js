const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./Models/User");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Artwork = require("./Models/Artwork");
const Order = require('./Models/Order');

app.use(express.json());
app.use(cors({
  origin:['https://arteora-project-frontend.vercel.app'],
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
require('dotenv').config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database is not connected");
  });
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));

const port=process.env.PORT || 5000

app.get('/',async(req,res)=>{
  res.json("hello");
})

app.post("/create-user", async (req, res) => {
  const { username, password, email, type } = req.body;

  const available=await User.findOne({email})

  if(available){
    return res.status(500).json({
      status:'email already available'
    })
  }

  const user = new User({
    username,
    email,
    password,
    type
  });

  try {
    await user.save();
    res.status(201).json({
      message: "User account created successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failure",
      error: err,
    });
  }
});

app.get("/get-user/:userId", async (req, res) => {
  const userID = req.params.userId;

  try {
    const user = await User.findById(userID);

    if (user) {
      res.status(200).json({
        status: "success",
        user: user,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "seller not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failure",
      message: "Error fetching the user",
      error: err,
    });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

app.put(
  "/update-user/:userId",
  upload.single("profilePhoto"),
  async (req, res) => {
    const userID = req.params.userId;

    const profilePhoto = req.file.filename;

    try {
      const user = await User.findById(userID);

      if (!user) {
        return res.status(404).json({
          status: "Failed",
          message: "user not found",
        });
      }

      user.profilePhoto = profilePhoto;
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Profile photo uploaded successfully",
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: "There was an error in uploadin the profile photo",
        err: error.message,
      });
    }
  }
);

app.post("/create-artwork", upload.array("imageUrls", 5), async (req, res) => {
  const { name, publishedDate, author, price, category, description } =
    req.body;

  const imageUrls = req.files.map((file) => file.filename);

  const artwork = new Artwork({
    name,
    publishedDate,
    author,
    price,
    category,
    description,
    imageUrls,
  });

  try {
    const savedArtwork = await artwork.save();

    const user = await User.findById(author);

    if (!user) {
      return res.status(404).json({
        status: "",
        message: "User not found",
      });
    }
    user.artworks = [...user.artworks, savedArtwork._id];
    await user.save();

    res.status(200).json({
      status: "Success",
      data: savedArtwork,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      err: `error creating the artwork,${error.message}`,
    });
  }
});

app.post("/get-user-artworks", async (req, res) => {
  const { artworks } = req.body;

  try {
    const userArtworks = await Artwork.find({ _id: { $in: artworks } });
    res.status(200).json({
      status: "success",
      data: userArtworks,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
});

app.get("/get-artwork/:id", async (req, res) => {
  const artworkId = req.params.id;

  try {
    const artwork = await Artwork.findById(artworkId);
    if (artwork) {
      res.status(200).json({
        status: "success",
        data: artwork,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
});

app.get("/get-artworks", async (req, res) => {
  try {
    const artworks = await Artwork.find({});
    if (artworks.length > 0) {
      res.status(200).json({
        status: "success",
        artworks: artworks,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

app.delete("/delete-artwork/:artworkId", async (req, res) => {
  const { artworkId } = req.params;

  try {
    if (artworkId) {
      const artwork = await Artwork.findByIdAndDelete(artworkId);
      res.status(200).json({
        status: "success",
        data: {},
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err,
    });
  }
});

app.put("/update-artwork/:artworkId",
  upload.array("newImages"),
  async (req, res) => {
    const artworkId = req.params.artworkId;
    const { name, description, price, category, existingImages } = req.body;
    const newImages = req.files;

    console.log("uploaded image files", newImages);
    console.log("existing images", existingImages);

    try {
      const artwork = await Artwork.findById(artworkId);

      if (!artwork) {
        return res.status(404).json({
          status: "artwork not found",
        });
      }

      artwork.name = name;
      artwork.description = description;
      artwork.category = category;
      artwork.price = price;

      const orderedImageUrls = [];

      const existingImagesArray=Array.isArray(existingImages) ? existingImages : [];
      existingImagesArray.forEach((image, index) => {
        orderedImageUrls[index] = image;
      });

      newImages.forEach((image, index) => {
        orderedImageUrls.push(image.filename);
      });

      artwork.imageUrls = orderedImageUrls;
      const updatedArtwork = await artwork.save();

      if (updatedArtwork) {
        return res.status(200).json({
          status: "success",
          data: updatedArtwork,
        });
      } else {
        return res.status(404).json({
          status: "user not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "failed",
        error: err.message,
      });
    }
  }
);

app.post('/login',async(req,res)=>{
  const{email,password}=req.body;

  try{
    const user=await User.findOne({email:email});

    if(!user){
      return res.status(404).json({
        status:'Invalid email address'
      })
    }
    if(password!==user.password){
      return res.status(401).json({
        msg:'Invalid email or password'
      })
    }
    res.status(200).json({
      status:'user found',
      data:user
    })
  }catch(err){
    res.status(500).json({
      status:'error finding the user',
      error:err.message
    })
  }
});

app.post('/buy-artwork',async (req,res)=>{
  const {artworkId,buyer,seller,amount,date,artworkName,buyerName}=req.body;

  console.log('received artwork id',req.body.buyer);
  console.log('received date',date);

  try{
    const artwork=await Artwork.findById(artworkId);
    const buyerObj=await User.findById(buyer);
    const sellerObj=await User.findById(seller);

    
    if(!artwork){
      return res.status(404).json({
        message:'invalid artwork'
      })
    }

    //Changing the status of the artwork after buying
    artwork.status='sold';
    const updatedArtwork=await artwork.save();
    
    if (!buyerObj.boughtArtworks.includes(artworkId)) {
      buyerObj.boughtArtworks.push(artworkId);
    }
    const updatedBuyer=await buyerObj.save();

    const order=new Order({
      artworkId,
      buyer,
      seller,
      amount,
      date,
      artworkName,
      buyerName
    })
    const savedOrder=await order.save();

    sellerObj.orders.push(savedOrder._id);
    const savedSeller=await sellerObj.save();

    res.status(200).json({
      status:'successfull',
      artwork:updatedArtwork,
      seller:savedSeller,
      buyer:updatedBuyer,
      order:savedOrder
    })

  }catch(err){
    res.status(500).json({
      status:'failed',
      err:err.message
    });
  }
})

app.post('/get-orders',async(req,res)=>{
  const {orders}=req.body;

  try{
    const orderObjects=await Order.find({_id:{$in:orders}});

    if(!orderObjects){
      return res.status(404).json({
        status:'no orders found'
      })
    }

    res.status(200).json({
      status:'success',
      data:orderObjects
    })

  }catch(err){
    res.status(500).json({
      status:'failed',
      error:err.message
    })
  }
})

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
