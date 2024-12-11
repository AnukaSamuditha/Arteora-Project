import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Axios from "axios";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function Artwork() {
  const [artwork, setArtwork] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
 
  //console.log("Artwork id here", params.artworkId);
  const url="http://localhost:5000";

  useEffect(() => {
    if (params.artworkId) {
      Axios.get(`${url}/get-artwork/${params.artworkId}`)
        .then((res) => {
          setArtwork(res.data.data);
          console.log("This is artwork", res.data.data);
          console.log('updated imageUrls',res.data.data.imageUrls);
        })
        .catch((err) => {
          console.log("Error fetching artwork", err);
        });
    }
  }, [params.artworkId]);

  function deleteArtwork(artworkId) {
    Axios.delete(`${url}/delete-artwork/${artworkId}`)
      .then((res) => {
        console.log("successfully deleted the artwork", res);
      })
      .catch((err) => {
        console.log("error deleting the artwork", err);
      });
  }

  function triggerAlert(artworkId) {
    Swal.fire({
      title: "Are you absolutely sure?",
      text: "This action cannot be undone. This will permanently delete your artwork from our servers.",
      showCancelButton: true,
      confirmButtonColor: "white",
      confirmButtonText: "Delete",
      customClass: {
        popup:
          "bg-zinc-800 border z-50 border-zinc-700 w-[90%] h-[15rem] max-w-[30rem] p-6 flex flex-col justify-start items-center  rounded-xl",
        title: "text-white font-semibold tracking-tight leading-none text-2xl",
        confirmButton:
          "bg-white text-black rounded-xl w-[6rem] text-sm font-medium",
        cancelButton:
          "bg-transparent text-white border border-zinc-800 w-[6rem] rounded-xl",
        text:'text-xs text-zinc-600',
      },
    }).then((result) => {
      if(result.isConfirmed){
        deleteArtwork(artworkId);
      navigate('/dashboard/artworks');
      Swal.fire({
        title: "Artwork Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        customClass:{
          popup:'bg-zinc-800 w-[90%] lg:w-[30rem] lg:max-w-[30rem] h-auto rounded-xl p-2 flex flex-col justify-start items-center',
          title:'text-white font-semibold tracking-tight leading-none text-2xl mb-2',
          text:'text-sm text-zinc-300 mb-2',
          confirmButton:'w-[8rem] bg-white rounded-xl text-black',
          icon:'scale-50 mb-2'
        }
      });
      }
    });
  }

  
  return (
    <div className="w-full h-auto flex flex-col gap-4 items-center relative p-4">
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

      <div className="w-full h-[28rem] p-3 relative lg:w-[18rem] lg:max-h-[25rem] flex justify-center items-center border border-zinc-800 rounded-xl">
        <p className="text-white  text-sm absolute top-6 left-5 bg-zinc-800 rounded-xl p-2 opacity-80 lg:text-xs">
          {artwork && artwork.category}
        </p>
        <img
          src={
            artwork &&
            `${url}/uploads/${artwork.imageUrls[currentImage]}`
          }
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="w-[20rem] flex justify-start items-center p-4 mt-5 gap-3 overflow-x-scroll scrollbar-hide">
        {artwork &&
          artwork.imageUrls.map((image, index) => (
            <div
              key={index}
              className="min-w-[4rem] h-[4rem] flex justify-center items-center cursor-pointer"
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={`${url}/uploads/${image}`}
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
      <div className="w-full h-[10rem]  flex flex-col justify-center items-center p-2 gap-4 lg:w-[20%] lg:h-[8rem]">
        <button className="w-full h-full text-black font-[600] text-xl leading-none outline-none bg-white rounded-xl lg:text-sm lg:w-[15rem]" onClick={()=>navigate(`/dashboard/artworks/update-artwork/${artwork._id}`)}>
          Update
        </button>
        <button
          className="w-full h-full text-white outline-none border border-red-700 rounded-xl  lg:text-sm lg:w-[15rem]"
          onClick={()=>triggerAlert(artwork._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
