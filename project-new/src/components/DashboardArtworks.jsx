import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Axios from "axios";

export default function DashboardArtworks() {
  const { user } = useOutletContext();
  const [artworks, setArtworks] = useState(user.artworks);
  const [artworkObjects,setArtworkObjects]=useState([]);

  const navigate=useNavigate();

  function handleNavigation(artworkId){
    navigate(`/dashboard/artworks/${artworkId}`)
  }

  useEffect(()=>{
    if(user.artworks && user.artworks.length>0){
        Axios.post(`http://localhost:5000/get-user-artworks`,{artworks : artworks})
        .then((res)=>{
            console.log("Successfully fetched user's artworks",res.data.data);
            setArtworkObjects(res.data.data);
        })
        .catch((err)=>{
            console.log("Error fetching user artworks",err.message);
        })
    }
  },[artworks]);

  
  //console.log('Artwork objects here',artworkObjects);

  return (
    <div className="w-full h-auto">
      <div className="h-auto w-full dark:bg-black bg-black  dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex flex-col items-center justify-center gap-8">
        {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
        <div className="w-full h-auto flex flex-col justify-start items-center mt-5 gap-5 lg:flex-wrap lg:flex-row lg:justify-center">
        {artworkObjects.length>0 && 
                artworkObjects.map((artwork)=>{
                    return <div key={artwork._id} className="w-[90%] h-[25rem] border border-zinc-800 rounded-xl p-3 bg-black flex flex-col justify-start gap-3 lg:w-[20%] lg:h-[20rem]" onClick={()=>handleNavigation(artwork._id)}>
                        <img src={artwork.imageUrls[0] ? `http://localhost:5000/uploads/${artwork.imageUrls[0]}` : null} alt={artwork.imageUrls[0] && artwork.imageUrls[0] } className="rounded-xl w-full h-[90%] object-cover"/>
                        <h1 className="text-white text-xl font-medium tracking-tight">{artwork.name}</h1>
                    </div>
                })
        }
      </div>

      </div>
      
    </div>
  );
}
