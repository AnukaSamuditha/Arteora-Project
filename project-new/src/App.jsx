import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/ui/Home";
import SignUp from "./components/ui/SignUp";
import Dashboard from "./components/Dashboard";
import DashboardHome from "./components/DashboardHome";
import DashboardArtworks from "./components/DashboardArtworks";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp/>}/>
          
          <Route path="dashboard" element={<Dashboard/>}>
           <Route index element={<DashboardHome/>}/>
           <Route path="artworks" element={<DashboardArtworks/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
