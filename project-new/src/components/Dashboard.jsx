import React, { useEffect, useRef, useState } from "react";
import { PanelLeft } from "lucide-react";
import ProfileIcon from "../Images/user.png";
import { House } from "lucide-react";
import { Image } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Axios from "axios";

export default function Dashboard() {
  const [panel, setPanel] = useState(false);
  const [userId, setUserId] = useState(
    localStorage.getItem("loggedUser") || null
  );
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    profilePhoto: null,
  });

  useEffect(() => {
    if (userId) {
      Axios.get(`http://localhost:5000/get-user/${userId}`)
        .then((res) => {
          setUser(res.data.user);
          console.log("user fetched", res.data.user);
        })
        .catch((err) => {
          console.log("User not found", err);
        });
    }
  }, [userId]);

  useEffect(() => {
    // Trigger form submission when profilePhoto is updated
    if (profile.profilePhoto) {
      const formElement = event.target.form;
      if (formElement) {
        formElement.requestSubmit();
      }
    }
  }, [profile.profilePhoto]);

  const fileInputRef = useRef(null);

  //console.log(localStorage.getItem('loggedUser'));

  function handleSideBar() {
    setPanel((prevValue) => !prevValue);
  }

  function handleProfilePhoto(event) {
    setProfile({ profilePhoto: event.target.files[0] });
  }

  function triggerFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("profilePhoto", profile.profilePhoto);

    Axios.put(`http://localhost:5000/update-user/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("Error uploading profile photo", err);
      });
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
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
                        ? `http://localhost:5000/uploads/${user.profilePhoto}`
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

              <NavLink
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
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col  p-5">
        <div className="flex justify-start items-center gap-5">
          <div
            className="flex justify-start items-center "
            onClick={handleSideBar}
          >
            <PanelLeft color="white" />
          </div>
          {/* Horizontal rule should be put here */}
          <div className="flex justify-center items-center">
            <h4 className="text-white text-lg">Tue 2024</h4>
          </div>
        </div>
        <div className="flex-1 p-5 overflow-auto w-full rounded-xl mt-10 lg:min-w-[80%]">
          <Outlet context={{user}} />
        </div>
      </div>
    </div>
  );
}
