import React from "react";
import { NavLink, Outlet,useOutletContext } from "react-router-dom";

export default function Artworks() {
    const {user,setUser}=useOutletContext();
    console.log("user is here",user);
  return (
    <div>
      <div className="flex justify-start items-center gap-5 w-full border border-zinc-800 rounded-xl p-3">
        <NavLink className={({isActive})=> isActive ? ' text-white bg-zinc-800 rounded-xl pt-2 pb-2 pr-3 pl-3 lg:text-sm' : 'text-white pt-2 pb-2 pr-3 pl-3 lg:text-sm'} to='.' end>Artworks</NavLink>
        <NavLink className={({isActive})=> isActive ? 'text-white bg-zinc-800 rounded-xl pt-2 pb-2 pr-3 pl-3 lg:text-sm' : 'text-white pt-2 pb-2 pr-3 pl-3 lg:text-sm'}to='publish-artwork'>Publish Artwork</NavLink>
      </div>
      <div className="w-full h-auto mt-5">
        <Outlet context={{user,setUser}}/>
      </div>
    </div>
  );
}
