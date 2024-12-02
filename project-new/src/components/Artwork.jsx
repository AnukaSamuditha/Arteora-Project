import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function Artwork() {
  const [artwork, setArtwork] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  console.log("Artwork id here", params.artworkId);

  useEffect(() => {
    if (params.artworkId) {
      Axios.get(`http://localhost:5000/get-artwork/${params.artworkId}`)
        .then((res) => {
          setArtwork(res.data.data);
          console.log("This is artwork", res.data.data);
        })
        .catch((err) => {
          console.log("Error fetching artwork", err);
        });
    }
  }, [params.artworkId]);

  return (
    <div className="w-full h-auto flex flex-col gap-4 items-center">
      <div className="flex justify-start items-center w-full">
        <ArrowLeft
          color="white"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>

      <div className="flex justify-start items-center lg:w-[25%]">
        <h3 className="text-white text-2xl font-bold  leading-none pr-4 pl-4">
          {artwork && artwork.name}
        </h3>
      </div>

      <div className="w-full h-[28rem] p-4 relative lg:w-[25%] lg:max-h-[25rem] flex justify-center items-center">
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
      <div className="w-full h-[10rem]  flex flex-col justify-center items-center p-4 gap-4 lg:w-[20%] lg:h-[8rem]">
        <button className="w-full h-full text-black font-[600] text-xl leading-none outline-none bg-white rounded-xl lg:text-sm ">
          Update
        </button>
        <button className="w-full h-full text-white outline-none border border-red-700 rounded-xl  lg:text-sm ">
          Delete
        </button>
      </div>
    </div>
  );
}
