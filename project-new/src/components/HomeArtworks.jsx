import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export default function HomeArtworks() {

    const [artworks,setArtworks]=useState([]);
    const navigate=useNavigate();

  useEffect(()=>{
    Axios.get('http://localhost:5000/get-artworks')
    .then((res)=>{
        setArtworks(res.data.artworks)
    })
    .catch((err)=>{
        console.log("Error fetching artworks",err);
    })
  },[]);

  if(artworks){
    console.log("Here is the all the artworks",artworks);
  }

  function handleNavigate(artworkId){
    navigate(`/artworks/${artworkId}`);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-[15rem] mt-10 flex flex-col justify-center items-center lg:mt-[8%]">
        <h3 className="text-4xl text-white font-semibold text-center p-4 tracking-tight leading-none lg:text-6xl ">
          Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-purple-400 to-indigo-600">Variety of Arts</span>
        </h3>
        <p className="text-zinc-400 w-[80%] font-medium tracking-none leading-none text-sm text-center pr-6 pl-6 lg:text-[17px] md:text-sm">
          Explore a gallery of creativity, where every artwork tells a story.
        </p>
        <div className="w-[70%] flex justify-around items-center rounded-xl border border-zinc-600 mt-5 h-[3rem] lg:h-[3.5rem] relative lg:w-[45%] md:w-[50%]">
          <Search color="white" className="w-[20%] lg:w-[10%] " />
          <input
            type="text"
            name="searchContent"
            placeholder="Explore variety of artworks"
            className="placeholder-zinc-600 bg-transparent w-[80%] lg:w-[90%] h-full text-white rounded-tr-[1000px] rounded-br-[1000px] focus:outline-none "
          />
        </div>
        <div className="lg:w-[50%] w-[90%] flex justify-center items-center mt-8">
        <small className="w-[45%] text-white text-sm tracking-tight leading-none font-semibold lg:pr-4 lg:pl-4">Trending Searches</small>
        <div className="w-[55%] flex justify-start items-center gap-5 overflow-hidden overflow-x-scroll scrollbar-hide">
          <small className="text-xs text-white whitespace-nowrap bg-zinc-800 pr-4 pl-4 pt-2 pb-2 rounded-xl">wall arts</small>
          <small className="text-xs text-white whitespace-nowrap bg-zinc-800 pr-4 pl-4 pt-2 pb-2 rounded-xl">abstract</small>
          <small className="text-xs text-white whitespace-nowrap bg-zinc-800 pr-4 pl-4 pt-2 pb-2 rounded-xl">canvas</small>
          <small className="text-xs text-white whitespace-nowrap bg-zinc-800 pr-4 pl-4 pt-2 pb-2 rounded-xl">liyando</small>
        </div>
      </div>
      </div>
      
      <div className="flex flex-col justify-center items-center w-full h-auto p-5 gap-8 lg:flex-wrap lg:flex-row">
      {artworks.length>0 && 
                artworks.map((artwork)=>{
                    return <div key={artwork._id} className="w-[80%] h-[25rem] border border-zinc-800 rounded-xl p-3 bg-black flex flex-col justify-start gap-3 lg:w-[20%] lg:h-[20rem]" onClick={()=>handleNavigate(artwork._id)}>
                        <img src={artwork.imageUrls[0] ? `http://localhost:5000/uploads/${artwork.imageUrls[0]}` : null} alt={artwork.imageUrls[0] && artwork.imageUrls[0] } className="rounded-xl w-full h-[90%] object-cover"/>
                        <h1 className="text-white text-xl lg:text-[17px] font-medium tracking-tight">{artwork.name}</h1>
                    </div>
                })
        }
      </div>
    </div>
  );
}
