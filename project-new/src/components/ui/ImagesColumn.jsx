import React from "react";
import { motion } from "framer-motion";


export default function ImagesColumn({ Image1,Image2,Image3,Y }) {
  

  return (
    <motion.div style={{y:Y}} className="relative flex w-full h-[140vh] lg:h-auto lg:w-[25%] flex-col items-center gap-4 lg:first:top-[-90%] lg:[&:nth-child(2)]:top-[-125%] lg:[&:nth-child(3)]:top-[-25%] lg:[&:nth-child(4)]:top-[-110%] ">
      <div className="w-full min-h-[30vh] lg:h-full rounded-[8px] overflow-hidden"><img src={Image1 && Image1} alt="image-1" className="w-full h-auto object-cover" /></div>
      <div className="w-full min-h-[30vh] lg:h-full rounded-[8px] overflow-hidden"><img src={Image2 && Image2} alt="image-1" className="w-full h-auto object-cover" /></div>
      <div className="w-full min-h-[30vh] lg:h-full rounded-[8px] overflow-hidden"><img src={Image3 && Image3} alt="image-1" className="w-full h-auto object-cover" /></div>
      <div className="w-full min-h-[30vh] lg:h-full rounded-[8px] overflow-hidden"><img src={Image1 && Image1} alt="image-1" className="w-full h-auto object-cover" /></div>
    </motion.div>
  );
}