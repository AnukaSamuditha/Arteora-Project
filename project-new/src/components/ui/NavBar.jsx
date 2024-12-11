import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ButtonWithIcon } from "./ButtonWithIcon";
import { AlignJustify, CircleX, House } from "lucide-react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import axios from "axios";
import emptyProfile from '../../Images/empty-profile.png';


export default function NavBar() {
  const url="http://localhost:5000";
  const [sidebar, setSidebar] = useState(false);
  const [cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
  const[user,setUser]=useState(null);
  const navigate=useNavigate();

  useEffect(()=>{
    if(cookies.loggedUser){
      axios.get(`${url}/get-user/${cookies.loggedUser}`)
      .then((res)=>{
        console.log('nav bar fetched the user',res.data.data);
        setUser(res.data.user);
      })
    }
  },[cookies.loggedUser]);

  const components = [
    {
      title: "Abstract",
      description:
        "Explore a collection of abstract art that uses shapes, colors, and forms to express ideas and emotions beyond realistic representation.",
    },
    {
      title: "Realism",
      description:
        "Discover artworks that capture the world in realistic detail, often focusing on intricate scenes, landscapes, and portraits.",
    },
    {
      title: "Surrealism",
      description:
        "Dive into surreal art pieces where imagination meets reality, creating dreamlike scenes that challenge perceptions.",
    },
    {
      title: "Digital Art",
      description:
        "Experience modern digital artworks created using digital tools, spanning a variety of styles from illustrative to conceptual.",
    },
    {
      title: "Nature & Landscapes",
      description:
        "A selection of nature-inspired art capturing the beauty of natural landscapes, wildlife, and organic forms.",
    },
    {
      title: "Pop Art",
      description:
        "Celebrate the vibrant world of pop art, characterized by bold colors, playful themes, and references to popular culture.",
    },
  ];

  const items = components.map((component) => {
    return (
      <li key={component.title}>
        <div className="text-white ">
          <h3 className="font-medium text-[14px]">{component.title}</h3>
          <p className="text-[12px] text-gray-400">{component.description}</p>
        </div>
      </li>
    );
  });

  return (
    <header className="flex sticky top-0 z-[100] w-full h-[60px] justify-between lg:justify-center items-center border-b border-zinc-800 backdrop-blur bg-transparent">
      <div className="flex justify-center items-center w-[15%] h-[100%] p-16 ">
        <h3 className="font-bold text-[20px] text-white">Arteora</h3>
      </div>
      <div className="p-6 lg:hidden relative">
        <AlignJustify
          color="white"
          onClick={() => setSidebar((prevValue) => !prevValue)}
          className=""
        />
        {sidebar && (
          <motion.div
            initial={{ right: -100}}
            animate={{ right: 0}}
            exit={{ right: -100}}
            transition={{duration:0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-[13rem] h-[25rem] absolute top-0 flex flex-col p-4 gap-5 justify-center items-center bg-zinc-950 z-[200] border border-zinc-700 rounded-xl"
          >
            <CircleX color="white" size={25} className="absolute top-4 right-2 opacity-70  " onClick={()=>setSidebar((prevValue)=>!prevValue)}/>
            <div className="w-full h-auto p-3 ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 text-xl leading-none font-medium"
                    : "text-white text-lg  font-medium leading-none"
                }
              >
                Home
              </NavLink>
            </div>

            <div className="w-full h-auto p-3">
              <NavLink
                to="about"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 text-xl leading-none font-medium"
                    : "text-white text-lg font-medium leading-none"
                }
              >
                About
              </NavLink>
            </div>

            <div className="w-full h-auto p-3">
              <NavLink
                to="artworks"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 text-xl  font-medium leading-none"
                    : "text-white text-lg  font-medium leading-none"
                }
              >
                Artworks
              </NavLink>
            </div>

            <div className="w-full h-auto p-3">
              <NavLink
                to="contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 text-xl leading-none font-medium"
                    : "text-white text-lg  font-medium leading-none"
                }
              >
                Contact
              </NavLink>
            </div>

            {cookies.loggedUser && 
              (<div className="w-full h-auto p-3">
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 text-xl leading-none font-medium"
                    : "text-white text-lg  font-medium leading-none"
                }
              >
                Dashboard
              </NavLink>
            </div>)
            }

          </motion.div>
        )}
      </div>
      <div className="hidden lg:flex justify-between lg:justify-start items-center w-[85%] h-[100%] gap-[3%] ml-[30%]">
        <Link to="/" className="text-white text-[14px] font-medium">
          Home
        </Link>
        <Link to="about" className="text-white text-[14px] font-medium">
          About
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="artworks">
                <NavigationMenuTrigger className="bg-transparent text-white font-[13px] p-2 z-30">
                  Artworks
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px] bg-black text-white z-40 ">
                    {items}
                  </ul>
                </NavigationMenuContent>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link to="contact" className="text-white text-[14px] font-medium">
          Contact
        </Link>
      </div>
      <ButtonWithIcon />
      {cookies.loggedUser && <div className="hidden w-[7rem] h-[3.5rem] rounded-full lg:flex justify-center items-center p-2 cursor-pointer" onClick={()=>navigate('/dashboard')}> {user && user.profilePhoto ? (<img src={`${url}/uploads/${user.profilePhoto}`} alt="profile-photo" className="w-full h-full object-cover rounded-full border-[2px] border-yellow-500"/> ) : (<img src={emptyProfile} alt="profile-photo" className="w-full h-full object-cover rounded-[1000px] border border-yellow-500"/> )}</div>}
    </header>
  );
}
