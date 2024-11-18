import React,{useEffect} from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Lenis from "lenis";

export default function Layout() {
  useEffect( () => {
    const lenis = new Lenis()
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
}, [])
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
