import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/Footer";

export default function Layout() {
  
  return (
    <div>
      <NavBar />
      <main>
        <Outlet/>
      </main>
    </div>
  );
}
