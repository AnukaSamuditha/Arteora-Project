import React, { useEffect, useRef, useState } from "react";
import { PanelLeft } from "lucide-react";
import ProfileIcon from "../Images/user.png";
import { House } from "lucide-react";
import { Image } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Axios from "axios";
import { useCookies } from "react-cookie";

export default function Dashboard() {
  const url=import.meta.env.VITE_BACKENDURL;
  const [panel, setPanel] = useState(false);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    profilePhoto: null,
  });
  const [cookie,setCookie,removeCookie]=useCookies(['loggedUser']);
  console.log('here is the cookie',cookie.loggedUser);
  const navigate=useNavigate();

  useEffect(() => {
    if (cookie.loggedUser) {
      Axios.get(`${url}/get-user/${cookie.loggedUser}`)
        .then((res) => {
          setUser(res.data.user);
          console.log("user fetched", res.data.user);
        })
        .catch((err) => {
          console.log("User not found", err);
        });
    }
  }, [cookie.loggedUser]);

  const fileInputRef = useRef(null);

  function handleSideBar() {
    setPanel((prevValue) => !prevValue);
  }

  function handleProfilePhoto(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setProfile({ profilePhoto: file });
  
      const formData = new FormData();
      formData.append("profilePhoto", file);
  
      Axios.put(`${url}/update-user/${cookie.loggedUser}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setUser(res.data.user);
          console.log("Profile photo updated successfully", res.data.user);
        })
        .catch((err) => {
          console.error("Error uploading profile photo", err);
        });
    }
  }
  

  function triggerFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleSignOut(){
    removeCookie(['loggedUser']);
    navigate('/');
  }


  function getDayOfWeek(date) {
    const options = { weekday: 'short' };  // 'short' gives you the abbreviated day like "Tue", "Wed"
    const day = new Date(date).toLocaleDateString('en-US', options); // You can change 'en-US' to your desired locale
    return day;
  }

  return (
    <div className="w-full h-[10%] flex  relative">
      <AnimatePresence>
        {panel && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`w-[70%]  top-0 z-100  h-screen absolute left-0 flex-col justify-start gap-3  bg-zinc-900 z-40 ${"flex"} lg:w-[20%] lg:sticky`}
          >
            <div className="w-full relative p-5 flex justify-start items-center gap-4 border-b border-zinc-700">
              <form encType="multipart/form-data" onSubmit={handleProfilePhoto}>
                <div className="w-10 rounded-[1000px]" onClick={triggerFileInput}>
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleProfilePhoto}
                    className="[display:none]"
                    accept=".png, .jpg, .jpeg"
                    ref={fileInputRef}
                  />
                  <img
                    src={
                      user.profilePhoto
                        ? `${url}/uploads/${user.profilePhoto}`
                        : ProfileIcon
                    }
                    alt="user-profile-photo"
                    className="rounded-[1000px]"
                  />
                </div>
              </form>
              <h5 className="text-md text-white font-medium">
                {user && user.username}
              </h5>
              <CircleX
                color="white"
                size={20}
                className="absolute top-2 right-2 opacity-55"
                onClick={handleSideBar}
              />
            </div>

            <div className="w-full h-full pr-3 pl-3 gap-2 flex flex-col justify-start items-center">
              <NavLink
                end
                to="."
                onClick={handleSideBar}
                className={({ isActive }) =>
                  isActive
                    ? "bg-zinc-800 w-full h-[5%] rounded-xl flex justify-center items-center lg:h-[7%]"
                    : " w-full h-[5%]  flex justify-center items-center lg:h-[7%]"
                }
              >
                <div className="flex justify-start items-center gap-4 p-5 w-full h-full">
                  <h4 className="text-white text-lg font-medium flex gap-3 items-center justify-start lg:text-sm">
                    <House size={20} color="white" /> Dashboard
                  </h4>
                </div>
              </NavLink>

              {user.type=='artist' && <NavLink
                to="artworks"
                onClick={handleSideBar}
                className={({ isActive }) =>
                  isActive
                    ? "bg-zinc-800 w-full h-[5%] rounded-xl flex justify-center items-center lg:h-[7%]"
                    : " w-full h-[5%]  flex justify-center items-center lg:h-[7%]"
                }
              >
                <div className="flex justify-start items-center gap-4 p-5 w-full h-full">
                  <h4 className="text-white text-lg font-medium flex gap-3 items-center justify-start lg:text-sm">
                    <Image color="white" size={20} /> Artworks
                  </h4>
                </div>
              </NavLink>}

              {user && user.type=='regular' && <NavLink
                to="my-artworks"
                onClick={handleSideBar}
                className={({ isActive }) =>
                  isActive
                    ? "bg-zinc-800 w-full h-[5%] rounded-xl flex justify-center items-center lg:h-[7%]"
                    : " w-full h-[5%]  flex justify-center items-center lg:h-[7%]"
                }
              >
                <div className="flex justify-start items-center gap-4 p-5 w-full h-full">
                  <h4 className="text-white text-lg font-medium flex gap-3 items-center justify-start lg:text-sm">
                    <Image color="white" size={20} /> My Artworks
                  </h4>
                </div>
              </NavLink>}
              <h1 className="text-zinc-500 text-lg lg:text-sm font-medium leading-none text-center absolute bottom-28 cursor-pointer" onClick={handleSignOut}>Sign Out</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full p-3 flex-1 flex flex-col ">
        <div className="flex justify-start items-center gap-3">
          <div
            className="h-[3rem] w-[3rem] flex justify-center items-center cursor-pointer"
            onClick={handleSideBar}
          >
            <PanelLeft color="white"/>
          </div>
          {/* Horizontal rule should be put here */}
          <div className="flex justify-center items-center">
            <h4 className="text-zinc-600 text-md font-semibold">{getDayOfWeek(new Date())} {new Date().getMonth()+1} {new Date().getFullYear()}</h4>
          </div>
        </div>
        <div className="flex-1 p-5 overflow-auto w-full rounded-xl mt-2 lg:min-w-[80%]">
          <Outlet context={{user,setUser}} />
        </div>
      </div>
    </div>
  );
}
