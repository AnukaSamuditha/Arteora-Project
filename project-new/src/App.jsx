import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/ui/Home";
import SignUp from "./components/ui/SignUp";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import DashboardArtworks from "./components/DashboardArtworks";
import Artworks from "./components/Artworks";
import PublishArtwork from "./components/PublishArtwork";
import Artwork from "./components/Artwork";
import HomeArtworks from "./components/HomeArtworks";
import HomeArtwork from "./components/HomeArtwork";
import UpdateArtwork from './components/UpdateArtwork';
import SignIn from "./components/SignIn";
import BuyArtwork from "./components/BuyArtwork";
import MyArtworks from "./components/MyArtworks";
import MyArtwork from "./components/MyArtwork";
import About from "./components/About";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<SignIn/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="artworks" element={<HomeArtworks />} />
          <Route path="artworks/:artworkId" element={<HomeArtwork />} />
          <Route path="artworks/:artworkId/buy-artwork" element={<BuyArtwork/>}/>

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="artworks" element={<Artworks />}>
              <Route index element={<DashboardArtworks />} />
              <Route path="publish-artwork" element={<PublishArtwork />} />
              <Route path=":artworkId" element={<Artwork />}/>
              <Route path="update-artwork/:artworkId" element={<UpdateArtwork />} /> 
            </Route>
            <Route path="my-artworks" element={<MyArtworks/>}/>
            <Route path="my-artworks/:artworkId" element={<MyArtwork/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
