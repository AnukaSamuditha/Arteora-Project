import React,{useState,useRef} from "react";
import Axios from "axios";
import { Brain, ImageUp } from "lucide-react";
import { motion } from "framer-motion";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

export default function PublishArtwork() {
    const url="https://arteora-project-backend.onrender.com";
    const {user,setUser}=useOutletContext();
    const[artworks,setArtworks] = useState(user.artworks);
    const [isExpanded,setExpanded] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef= useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        publishedDate: "",
        author: "",
        description: "",
        price: 0,
        imageUrls: [],
        category: "",
      });

  function triggerFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleChange(event) {
    setFormData((prevData) => {
      const { name, value } = event.target;

      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function handleFileChange(event) {
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData();

    form.append("name", formData.name);
    form.append("publishedDate", new Date());
    form.append("author", user._id);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category", formData.category);

    selectedFiles.forEach((file) => {
      form.append("imageUrls", file);
    });

    Axios.post(`${url}/create-artwork`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("Artwork created successfully");
        //setArtworks((prevData) => [...prevData, res.data._id]);
        setFormData({
          name: "",
          publishedDate: "",
          author: "",
          description: "",
          price: 0,
          imageUrls: [],
          category: "",
        });
        const newArtwork=res.data.data;
        setUser((prevData)=>{
          return{
            ...prevData,
            artworks:[...prevData.artworks,newArtwork._id]
          }
        })
        setSelectedFiles([]);
        setExpanded((prevValue)=>!prevValue);
        
      })
      .catch((err) => {
        console.log("Error creating artwork", err.response || err);
      });
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        {artworks && artworks.length == 0 && (
          <h3 className="text-white text-xl text-bold">
            No Artworks yet - Start creating
          </h3>
        )}
        {!isExpanded && (
          <button
            onClick={() => setExpanded((prevValue) => !prevValue)}
            className="border-none gap-3 bg-white rounded-[8px] w-[85%] flex justify-center items-center h-[3.5rem] font-semibold text-xl mb-5 lg:w-[15rem] lg:text-sm lg:h-[3rem] mt-5 "
          >
            <Brain />
            Publish Artwork
          </button>
        )}
      </div>
      {isExpanded && <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 180, damping: 10 }}
        className="w-full flex justify-center items-center"
      >
        <form
          encType="multipart/form-data"
          className="border border-zinc-800 bg-black rounded-[8px] w-full h-full p-5 lg:w-[25rem] lg:mt-16"
          onSubmit={handleSubmit}
        >
          <h5 className="text-white text-2xl font-medium text-left mb-1">
            Publish Artwork
          </h5>
          <h5 className="text-zinc-400  text-sm mb-2">
            Provide artworks details here
          </h5>

          <label
            htmlFor="name"
            className="text-sm font-medium text-white  mb-5"
          >
            Name
          </label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400"
          />

          <label
            htmlFor="description"
            className="text-sm font-medium text-white  mb-5"
          >
            Description
          </label>
          <br />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[10rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400 text-center"
            placeholder="start describing your artwork"
          />

          <label
            htmlFor="price"
            className="text-sm font-medium text-white mb-10"
          >
            Price
          </label>
          <br />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400"
          />

          <label
            htmlFor="price"
            className="text-sm font-medium text-white mb-10"
          >
            Category
          </label>
          <br />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400"
          />

          <label
            htmlFor="imageUrls"
            className="text-sm font-medium text-white mb-10"
          >
            Artwork
          </label>
          <br />
          <div className="flex justify-center items-center w-full h-[5rem] mb-5">
            <div
              className="flex justify-center items-center w-[4rem] h-[4rem] border border-zinc-800 rounded-xl"
              onClick={triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept=".png , .jpg , .jpeg"
                name="imageUrls"
                onChange={handleFileChange}
                className="hidden"
              />
              <ImageUp color="white" />
            </div>
          </div>
          <div className="flex justify-content items-center gap-3 w-full p-5">
            {selectedFiles.map((file) => (
              <img
                key={URL.createObjectURL(file)}
                src={URL.createObjectURL(file)}
                className="w-[4rem] h-[4rem] object-cover"
                alt="file"
              />
            ))}
          </div>
          <button className="w-full bg-white text-black text-sm font-bold rounded-[8px] h-[2.5rem] mb-5">
            Publish
          </button>
        </form>
      </motion.div>}
    </div>
  );
}
