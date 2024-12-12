import { Separator } from "@radix-ui/react-dropdown-menu";
import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Meteors from "./ui/meteors";

export default function Footer() {
  return (
    <div className="relative w-full h-[37rem] bg-white pt-8 flex flex-col justify-center items-center rounded-t-3xl lg:rounded-t-[6rem] overflow-hidden">
      <Meteors number={4}/>
      <h1 className="z-[100] text-8xl font-bold tracking-tighter text-black text-center">
        Arteora
      </h1>
      <div className="w-full h-[10rem] bg-white p-4  flex flex-col justify-center items-center gap-3 mt-20">
        <h2 className="scroll-m-20  text-black text-center text-3xl lg:text-5xl font-semibold tracking-tight mt-10   bg-clip-text text-transparent   bg-gradient-to-r from-amber-200 to-yellow-400">
          Subscribe to Our Newsletter!
        </h2>
        <p className="font-semibold tracking-tighter text-center text-sm text-zinc-500 w-[90%] lg:w-[50%]">
        Stay updated with the latest news, exclusive offers, and valuable insights delivered straight to your inbox. Join our community today and never miss out!
        </p>
        <div className="flex justify-center items-center w-full gap-4 mb-5">
          <input
            type="email"
            className=" border-[2px] border-gray-400 focus:outline-none rounded-xl bg-white h-10 p-4"
            placeholder="Enter your email"
          />
          <button className="rounded-xl bg-black text-white text-sm tracking-tight font-semibold h-10 w-32 active:scale-95 duration-75">
            Subscribe
          </button>
        </div>
    
        <div className="w-full flex justify-center items-center gap-14">
            <Link className="text-xs text-black font-semibold tracking-tighter" to='/'>Home</Link>
            <Link className="text-xs text-black font-semibold tracking-tighter" to='/about'>About</Link>
            <Link className="text-xs text-black font-semibold tracking-tighter" to='/artworks'>Artworks</Link>
            <Link className="text-xs text-black font-semibold tracking-tighter" to='/contact'>Contact</Link>
        </div>
        <div className="w-full flex justify-center items-center gap-5 mt-10 mb-5">
            <Github color="black" className="cursor-pointer"/>
            <Linkedin color="black" className="cursor-pointer"/>
            <Mail color="black" className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}
