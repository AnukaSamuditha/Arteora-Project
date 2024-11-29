import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Brain } from "lucide-react";

export default function DashboardArtworks() {

  const { user } = useOutletContext();
  const [artworks,setArtworks] = useState(user.artworks || [])
  const [isExpanded,setExpanded]= useState(false);
  const [formData,setFormData]=useState({
    name:'',
    publishedDate:'',
    author:'',
    description:'',
    price:'',
    imageUrls:[],
    category:''
  })

  function handleChange(event){

  }

  function handleSubmit(){

  }


  return (
    <div className="w-full h-[10%]">
      <div className="h-auto w-full dark:bg-black bg-black  dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-center justify-center">
        
        {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
        <div className="flex flex-col justify-center items-center gap-4">
        {artworks.length==0 && <h3 className="text-white text-xl text-bold">No Artworks yet - Start creating</h3>}
        <button className="border-none gap-3 bg-white rounded-[8px] w-[85%] flex justify-center items-center h-[3.5rem] font-semibold text-xl"><Brain/>Publish Artwork</button>
        </div>
        <form className="border border-zinc-800 rounded-[8px] w-full h-full p-5 lg:w-[30%] lg:mt-16" onSubmit={HandleSubmit}>
            <h5 className="text-white text-2xl font-medium text-left mb-1">Signup</h5>
            <h5 className="text-zinc-400  text-sm mb-2">Enter your email to get started!</h5>

                <label htmlFor="username" className="text-sm font-medium text-white  mb-5">Username</label><br/>
                <input type="text" name="username" value={formData.username} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400" />

                <label htmlFor="email" className="text-sm font-medium text-white  mb-5">Email Address</label><br/>
                <input type="email" name="email" value={formData.email} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400" placeholder="m@example.com"/>

                <label htmlFor="password" className="text-sm font-medium text-white mb-10">Password</label><br/>
                <input type="password" name="password" value={formData.password} onChange={HandleChange} className="border border-zinc-800 bg-transparent w-full rounded-[8px] h-[2.5rem] mb-5 text-zinc-300 text-sm p-4 placeholder-zinc-400" />

                <button className="w-full bg-white text-black text-sm font-medium rounded-[8px] h-[2.5rem] mb-5">Submit</button>
                <button className="w-full border border-zinc-700 text-white text-sm font-medium rounded-[8px] h-[2.5rem] hover:bg-zinc-700">Sign up with Google</button>
                <p className="text-sm text-center text-white mt-4">Already have an account? <span className="underline">Log in</span></p>
            </form>
      </div>
    </div>
  );
}
