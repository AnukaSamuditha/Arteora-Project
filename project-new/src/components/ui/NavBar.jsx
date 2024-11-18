import { Link } from "react-router-dom";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { ButtonWithIcon } from "./ButtonWithIcon";


export default function NavBar() {
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

      const items=components.map((component)=>{
        return <li key={component.title}><div className="text-white ">
              <h3 className="font-medium text-[14px]">{component.title}</h3>
              <p className="text-[12px] text-gray-400">{component.description}</p>
            </div></li>
      })
      
      
  return (
    <header className="flex fixed z-[100] w-full h-[60px] justify-center items-center border-b border-zinc-800 backdrop-blur bg-transparent ">
      <div className="flex justify-center items-center w-[15%] h-[100%] ">
        <h3 className="font-bold text-[20px] text-white">Arteora</h3>
      </div>
      <div className="flex justify-start items-center w-[85%] h-[100%]  gap-[3%] ml-[30%]">
        <Link to="/" className="text-white text-[14px] font-medium">
          Home
        </Link>
        <Link to="/" className="text-white text-[14px] font-medium">
          About
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/artworks">
                <NavigationMenuTrigger className="bg-transparent text-white font-[13px] p-2 z-30">Artworks</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px] bg-black text-white z-40 ">
                    {items}
                  </ul>
                </NavigationMenuContent>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link to="/" className="text-white text-[14px] font-medium">
          Contact
        </Link>
        
      </div>
      <ButtonWithIcon />
    </header>
  );
}
