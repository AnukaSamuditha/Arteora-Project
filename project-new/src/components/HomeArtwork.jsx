import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function HomeArtwork() {
  const [artwork, setArtwork] = useState(null);
  const [currentImage,setCurrentImage]=useState(0);

  const { artworkId } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    if (artworkId) {
      Axios.get(`http://localhost:5000/get-artwork/${artworkId}`)
        .then((res) => {
          setArtwork(res.data.data);
          console.log("Home artwork data is here", res.data.data);
        })
        .catch((err) => {
          console.log("Error fetching home artwork", err);
        });
    }
  }, [artworkId]);

  if(!artwork){
    return(
      <div>
        <h1 className="text-white text-sm font-medium tracking-tight">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="w-full p-5 h-auto flex flex-col gap-4 items-center">
      <div className="flex justify-start items-center w-full">
        <ArrowLeft
          color="white"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>

      <div className="flex justify-start  items-center lg:w-[25%]">
        <h3 className="text-white text-2xl font-bold  leading-none pr-4 pl-4">
          {artwork && artwork.name}
        </h3>
      </div>

      <div className="w-[85%] h-[28rem] p-4 relative lg:w-[25%] lg:max-h-[25rem] flex justify-center items-center">
        <p className="text-white  text-sm absolute top-6 left-5 bg-zinc-800 rounded-xl p-2 opacity-80 lg:text-xs">
          {artwork && artwork.category}
        </p>
        <img
          src={
            artwork &&
            `http://localhost:5000/uploads/${artwork.imageUrls[currentImage]}`
          }
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="w-full flex justify-center items-center p-4 mt-5 gap-3">
        {artwork &&
          artwork.imageUrls.map((image, index) => (
            <div
              key={index}
              className="w-[4rem] h-[4rem] flex justify-center items-center"
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={`http://localhost:5000/uploads/${image}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
      </div>
      <div className="w-full lg:w-[35%]">
        <p className="text-zinc-400 text-xl font-medium tracking-tighter text-justify p-4 lg:text-sm">
          {artwork && artwork.description}
        </p>
      </div>
      <h5 className="text-xl text-white tracking-tighter pr-4 pl-4">
        ${artwork && artwork.price}
      </h5>
      <div className="w-full h-[5rem]   flex flex-col justify-center items-center p-2 gap-4 lg:w-[20%] lg:h-[4rem]">
        <button className="w-full h-full text-black font-[600] text-xl leading-none outline-none bg-white rounded-xl lg:text-sm ">
          Buy
        </button>
        
      </div>
    </div>
  );
}
