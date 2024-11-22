import React from "react";
import { motion } from "framer-motion";


export default function ImagesColumn({ Image1,Image2,Image3,Y }) {
  

  return (
    <motion.div style={{y:Y}} className="relative flex w-[25%] flex-col items-center gap-4 first:top-[-110%] [&:nth-child(2)]:top-[-125%] [&:nth-child(3)]:top-[-125%] [&:nth-child(4)]:top-[-110%]">
      <div className="w-full h-full rounded-[8px] overflow-hidden"><img src={Image1 && Image1} alt="image-1" className=" object-cover" /></div>
      <div className="w-full h-full  rounded-[8px] overflow-hidden"><img src={Image2 && Image2} alt="image-1" className="  object-cover" /></div>
      <div className="w-full h-full  rounded-[8px] overflow-hidden"><img src={Image3 && Image3} alt="image-1" className=" object-cover" /></div>
      <div className="w-full h-full  rounded-[8px] overflow-hidden"><img src={Image1 && Image1} alt="image-1" className="  object-cover" /></div>
    </motion.div>
  );
}
