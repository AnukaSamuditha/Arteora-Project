import React,{useEffect} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/ui/Home";
import Lenis from "lenis";
import SignUp from "./components/ui/SignUp";
import Page from "./components/ui/UserDashboard";

export default function App() {
  useEffect( () => {
    const lenis = new Lenis()
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
}, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile" element={<Page/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
