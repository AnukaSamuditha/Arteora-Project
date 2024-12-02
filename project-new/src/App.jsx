import React from "react";
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="artworks" element={<HomeArtworks/>}/>

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="artworks" element={<Artworks />}>
              <Route index element={<DashboardArtworks/>} />
              <Route path="publish-artwork" element={<PublishArtwork/>}/>
              <Route path=":artworkId" element={<Artwork/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
