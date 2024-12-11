import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, FilePenLine, ImageUp, Trash2 } from "lucide-react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateArtwork() {
  const url="http://localhost:5000";
  const [artwork, setArtwork] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrls: [],
  });
  const [updatedImages, setUpdatedImages] = useState([]);
  const params = useParams();
  const fileInputRef = useRef([]);
  const newFileRef=useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.artworkId) {
      Axios.get(`${url}/get-artwork/${params.artworkId}`)
        .then((res) => {
          setArtwork(res.data.data);
          console.log("successfully fetched artwork data");
        })
        .catch((err) => {
          console.log("error fetching artwork data for updating", err);
        });
    }
  }, [params.artworkId]);

  useEffect(() => {
    if (artwork) {
      setFormData({
        name: artwork.name,
        description: artwork.description,
        price: artwork.price,
        category: artwork.category,
        imageUrls: artwork.imageUrls,
      });

      setUpdatedImages(artwork.imageUrls);
    }
  }, [artwork]);

  function triggerFileInput(index) {
    if (fileInputRef.current) {
      fileInputRef.current[index].click();
    }
  }

  function triggerNewFileInput(){
    if(newFileRef.current){
      newFileRef.current.click();
    }
  }


  function handleFileChange(event, index) {
    const newFile = event.target.files[0];

    const updatedFiles = [...updatedImages];
    updatedFiles[index] = newFile;
    setUpdatedImages(updatedFiles); // this is for rendering purpose

    setFormData((prevData) => {
      return {
        ...prevData,
        imageUrls:updatedFiles
      };
    });
  }

  function handleNewFileUpload(event){

    const newFiles=Array.from(event.target.files);

    setFormData((prevData)=>{
      return{
        ...prevData,
        imageUrls:[...prevData.imageUrls,...newFiles]
      }
    })
    setUpdatedImages((prevImages)=>[...prevImages,...newFiles]);

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

  function handleRemoveImage(index){
    const currentImages=[...formData.imageUrls];
    currentImages.splice(index,1)
    setFormData((prevData)=>{
      return{
        ...prevData,
        imageUrls:currentImages
      }
    })
    setUpdatedImages(currentImages);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("price", formData.price);
    
    const tempNewImages=[];
    const tempExistingImages=[];

    formData.imageUrls.forEach((url,index)=>{
      if(url instanceof File){
        tempNewImages.push(url)
      }
      else{
        tempExistingImages.push(url)
      }
    })

    tempNewImages.forEach((file)=>{
      form.append('newImages',file);
    })

    tempExistingImages.forEach((image)=>{
      form.append('existingImages',image);
    })

    console.log("uploaded files from the front end", formData.imageUrls);

    Axios.put(
      `${url}/update-artwork/${params.artworkId}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        setArtwork(res.data.data);
        console.log("successfully updated the artwork", res.data);
        navigate(-1);
      })
      .catch((err) => {
        console.log("error updating the artwork", err);
      });
  }

  if (!formData) {
    return <h1 className="text-white text-sm">Loading...</h1>;
  }

  return (
    <div className="w-full h-auto justify-start">
      <ArrowLeft color="white" className="mb-5" onClick={() => navigate(-1)} />
      <div className="w-full h-auto flex justify-center items-center">
      <form
        encType="multipart/form-data"
        className="border border-zinc-800 bg-black rounded-[8px] w-full h-full p-5 lg:w-[30%] lg:mt-16"
        onSubmit={handleSubmit}
      >
        <h5 className="text-white text-2xl font-medium text-left mb-1">
          Update Artwork
        </h5>
        <h5 className="text-zinc-400  text-sm mb-2">
          Provide latest artwork details here
        </h5>

        <label htmlFor="name" className="text-sm font-medium text-white  mb-5">
          Name
        </label>
        <br />
        <input
          type="text"
          name="name"
          value={formData && formData.name}
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
          value={formData && formData.description}
          onChange={handleChange}
          className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[10rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400 text-center"
          placeholder="start describing your artwork"
        />

        <label htmlFor="price" className="text-sm font-medium text-white mb-10">
          Price
        </label>
        <br />
        <input
          type="number"
          name="price"
          value={formData && formData.price}
          onChange={handleChange}
          className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400"
        />

        <label htmlFor="price" className="text-sm font-medium text-white mb-10">
          Category
        </label>
        <br />
        <input
          type="text"
          name="category"
          value={formData && formData.category}
          onChange={handleChange}
          className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400"
        />

        <label
          htmlFor="imageUrls"
          className="text-sm font-medium text-white mb-10"
        >
          Artworks
        </label>
        <br />
        <div className="flex justify-center items-center w-full h-[12rem] mb-5">
          <div className="flex justify-start items-center w-[20rem] h-[12rem] border border-zinc-800 rounded-xl gap-3 p-2 overflow-hidden overflow-x-scroll scrollbar-hide">
            {updatedImages.map((image, index) => {
              return (
                <div
                  key={index}
                  className="min-w-[8rem]  h-[10rem] rounded-xl hover:bg-black hover:opacity-60 relative"
                >
                  <FilePenLine
                    color="white"
                    size={20}
                    className="absolute top-2 right-2 lg:top-1/2 lg:left-[40%]"
                    onClick={() => triggerFileInput(index)}
                  />
                  <Trash2
                    color="white"
                    size={20}
                    onClick={()=>handleRemoveImage(index)}
                    className="absolute top-2 left-2   lg:top-1/4 lg:left-[40%]"
                  />
                  <input
                    type="file"
                    className="hidden"
                    name="imageUrls"
                    accept=".png , .jpg, .jpeg"
                    ref={(el) => (fileInputRef.current[index] = el)}
                    onChange={(event) => handleFileChange(event, index)}
                  />
                  <img
                    src={
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : `${url}/uploads/${image}`
                    }
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="min-w-[4rem] sticky h-[8rem] border flex flex-col justify-center items-center border-zinc-800 rounded-xl mb-5 gap-3 cursor-pointer" onClick={triggerNewFileInput}>
          <ImageUp color="white" />
          <input type="file" multiple className="hidden" accept=".png , .jpg , .jpeg" ref={newFileRef} onChange={handleNewFileUpload}/>
          <small className="text-zinc-400 font-bold tracking-tight leading-none">Upload New</small>
        </div>
        <button className="w-full bg-white text-black text-sm font-bold rounded-[8px] h-[3rem] mb-5">
          Save
        </button>
      </form>
      </div>
    </div>
  );
}
