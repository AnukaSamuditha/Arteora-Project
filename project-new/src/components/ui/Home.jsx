import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MarqueeDemo } from "./ArtworksMarquee";
import { SafariDemo } from "./SafariDemo";
import { motion, useScroll, useTransform } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Lenis from "lenis";
import { Drama, User } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import ShineBorder from "./shine-border";
import { Container } from "postcss";
import AvatarCircles from "./AvatarCircles";
import { MagicCard } from "./magic-card";
import { black } from "tailwindcss/colors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      smoothWheel: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on("scroll", (e) => {
      //console.log(e);
    });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const ref = useRef(null);
  const featuresContainer = useRef(null);

  const { scrollYProgress: progress1 } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const { scrollYProgress: progress2 } = useScroll({
    target: featuresContainer,
    offset: ["start end", "start center"],
  });

  const scaleValue = useTransform(progress1, [0, 0.7, 1], [0.7, 1, 0.7]);
  const featuresScale = useTransform(progress2, [0, 1], [0, 1]);

  console.log(featuresScale);

  const artistsContainer = useRef(null);

  const { scrollYProgress: progress3 } = useScroll({
    target: artistsContainer,
    offset: ["start end", "end start"],
  });

  const lg = useTransform(progress3, [0, 1], [0, -130]);
  const md = useTransform(progress3, [0, 1], [0, -100]);
  const sm = useTransform(progress3, [0, 1], [0, -90]);

  return (
    <div className="flex flex-col justify-start items-center w-full h-full">
      <div className="flex flex-col w-full h-[80vh] mt-[20vh] justify-center items-center bg-black dark:bg-black bg-dot-white/[0.2] dark:bg-dot-white/[0.2] relative">
        {/* Radial gradient for the background effect */}
        <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h1 className="font-[600] text-[65px] w-[90%] tracking-tight leading-tight text-center mt-5 relative z-10  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Discover and Collect Art from{" "}
          <span className="bg-gradient-to-r from-lime-300 to-yellow-400 inline-block text-transparent bg-clip-text">
            Emerging Creators
          </span>
        </h1>
        <p className="text-[17px] text-gray-400  mb-5 relative z-10">
          Explore curated collections, support talented artists, and find the
          perfect piece to elevate your space
        </p>
        <div className="flex justify-center items-center w-[300px] h-[80px] gap-5 relative z-10">
          <Button
            variant="destructive"
            className="bg-green-400 text-black rounded-[8px] w-[110px] font-[500] hover:bg-green-400"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className=" text-white bg-transparent  rounded-[8px] w-[110px] font-[500] hover:text-black"
          >
            Sign In
          </Button>
        </div>
      </div>

      <MarqueeDemo />
      {/* <Separator className="my-4 mt-5 mb-5 text-zinc-800"/> */}

      <h2 className="scroll-m-20 pb-2 text-white text-5xl font-semibold tracking-tight first:mt-0 mt-28 mb-5">
        What is Arteora?
      </h2>
      {/* <CardDemo/> */}
      {/* <div className="w-full h-[50vh] flex justify-center items-center ">
        <img src={Image1} className="w-[70%] h-[100%] object-cover"/>
      </div> */}
      <p className="text-sm text-zinc-500 w-[50%] text-justify font-medium">
        Welcome to Arteora, a vibrant hub for art lovers and creators alike. At
        Arteora, we celebrate the boundless creativity of artists and bring
        together diverse art styles from all over the world. Our platform is
        designed to inspire, educate, and connect individuals who share a
        passion for artistic expression, whether through traditional paintings,
        digital art, surreal creations, or nature-inspired pieces.
      </p>
      <motion.div
        ref={ref}
        style={{ scale: scaleValue }}
        className="mt-2 w-[60%] h-[500px] flex justify-center items-center"
      >
        <SafariDemo />
      </motion.div>
      <Separator className="my-4 w-[80%] bg-zinc-800 h" />
      <h2 className="scroll-m-20 pb-2 text-white text-5xl font-semibold tracking-tight first:mt-0 mt-16 mb-5 ">
        Revolutionizing the Art Experience
      </h2>
      <motion.div className="flex justify-center items-center w-[90%] h-[180px] p-5 gap-9 relative">
        <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          className="flex flex-col justify-center items-center w-[40%] h-full border rounded-[8px] bg-background md:shadow-xl overflow-hidden"
        >
          <motion.div
            ref={featuresContainer}
            style={{ opacity: featuresScale }}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex justify-start items-center w-full gap-3 p-3">
              <Drama size={32} className="text-zinc-500" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-zinc-400">
                Seamless Art Discovery
              </h4>
            </div>
            <p className="text-xs text-white text-justify w-[90%]">
              Effortlessly explore a curated collection of art tailored to your
              preferences. Filter by categories, styles, or trending pieces to
              find your next masterpiece.
            </p>
          </motion.div>
        </ShineBorder>

        <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          className="flex flex-col justify-center items-center w-[40%] h-full border rounded-[8px] bg-background md:shadow-xl overflow-hidden"
        >
          <motion.div
            ref={featuresContainer}
            style={{ opacity: featuresScale }}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex justify-start items-center w-full gap-3 p-3">
              <ShieldCheck size={32} className="text-zinc-500" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-zinc-400">
                Secure Art Marketplace
              </h4>
            </div>
            <p className="text-xs text-white text-justify w-[90%]">
              Buy and sell art with confidence through our secure payment
              gateway. Arteora ensures authenticity and smooth transactions for
              collectors and artists alike.
            </p>
          </motion.div>
        </ShineBorder>

        <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          className="flex flex-col justify-center items-center w-[40%] h-full border rounded-[8px] bg-background md:shadow-xl overflow-hidden"
        >
          <motion.div
            ref={featuresContainer}
            style={{ opacity: featuresScale }}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex justify-start items-center w-full gap-3 p-3">
              <User size={32} className="text-zinc-500" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-zinc-400">
                Personalized Support
              </h4>
            </div>
            <p className="text-xs text-white text-justify w-[90%]">
              Build meaningful connections with emerging artists. Access their
              profiles, view their stories, and directly support their work.
            </p>
          </motion.div>
        </ShineBorder>
      </motion.div>
      <Separator className="my-4 w-[80%] bg-zinc-800 mt-16" />

      <motion.div className="h-[190vh] relative w-full flex flex-col items-center justify-start">
        <motion.h2
          style={{ y: sm }}
          className="scroll-m-20 pb-2 text-white text-5xl font-semibold tracking-tight mt-16 mb-3 "
        >
          Discover Our Artistic Community
        </motion.h2>
        <p className="text-sm text-zinc-400 text-center mb-7">
          Join a vibrant network of passionate artists and art lovers, united by
          creativity and innovation.
        </p>
        <AvatarCircles />
        <motion.div
          ref={artistsContainer}
          className="flex justify-center items-center w-[90%] h-[500px] gap-20 mt-6"
        >
          <MagicCard
            style={md}
            className="cursor-pointer flex-col items-center justify-start p-3 whitespace-nowrap text-4xl bg-zinc-900 w-[20%] h-[60%] border-zinc-700 shadow-zinc-800 shadow-3d"
            gradientColor="#262626"
          >
            <div className="w-full  flex justify-center items-center gap-3 border border-red-600">
              <Avatar className="z-[-3] blur-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col  leading-tight">
                <h5 className="text-sm leading-none text-white font-medium">
                  Anuka Samuditha
                </h5>
                <h5 className="text-xs leading-none text-zinc-700">
                  Digital Illustrator
                </h5>
              </div>
            </div>
            <p className="text-white text-xs text-justify border border-red-700 w-full h-[90%]">
              Arteora is a breath of fresh air for artists like me! The platform
              has given me a space to showcase my work and connect with fellow
              creatives. The design is sleek, and the tools are easy to use.
              Highly recommended
            </p>
          </MagicCard>
          <MagicCard
            style={lg}
            className="cursor-pointer flex-col items-center justify-center  bg-zinc-900 text-4xl dark:bg-[#262626] w-[22%] h-[70%] border-zinc-700 shadow-zinc-800 shadow-3d "
            gradientColor="#262626"
          >
            Text2
          </MagicCard>
          <MagicCard
            style={sm}
            className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl bg-zinc-900 w-[20%] h-[60%] border border-zinc-700 shadow-zinc-800 shadow-3d"
            gradientColor="#262626"
          >
            Text3
          </MagicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
