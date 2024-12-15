import React, { useRef, useEffect } from "react";
import background from "../Images/aboutBg.jpg";
import monalisa from "../Images/mona-lisa.png";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import Footer from "./Footer";
import { ArrowDownRight, ArrowUpRight, Store } from "lucide-react";
import Office from "../Images/office.jpg";
import { useNavigate } from "react-router-dom";

export default function About() {
  const container = useRef(null);
  const storyContainer = useRef(null);
  const CTAref=useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on("scroll", (e) => {
      //console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const { scrollYProgress: progress } = useScroll({
    target: container,
    offset: ["start end", "center center"],
  });

  const { scrollYProgress: progress2 } = useScroll({
    target: storyContainer,
    offset: ["start end", "center center"],
  });

  const { scrollYProgress: progress3 } = useScroll({
    target: CTAref,
    offset: ["start end", "center center"],
  });

  const progressValue = useTransform(progress, [0, 1], [0, -130]);

  const progress2Value = useTransform(progress2, [0, 1], [0, -140]);
  const progress3Value = useTransform(progress3, [0, 1], [0, -140]);

  return (
    <div className="w-full h-auto">
      <div className="relative w-full h-auto  flex flex-col justify-center items-center mt-8">
        <img
          src={background}
          alt="about-bg"
          className="w-[80%] h-[40rem] object-cover"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black dark:from-background"></div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-black dark:from-background"></div>

        <div className="pointer-events-none absolute inset-x-0 top-2 h-1/4 bg-gradient-to-b from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black dark:from-background"></div>

        <div className="pointer-events-none absolute inset-x-0 bottom-2 h-1/4 bg-gradient-to-t from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black dark:from-background"></div>

        <h1 className="absolute top-1/4 text-white font-bold text-center text-6xl tracking-tighter">
          About Us
        </h1>
        <p className="absolute w-1/2 p-5 top-1/3 text-zinc-500 font-semibold tracking-tighter text-justify text-sm">
          Welcome to Arteora, a vibrant hub for art lovers and creators alike.
          At Arteora, we celebrate the boundless creativity of artists and bring
          together diverse art styles from all over the world. Our platform is
          designed to inspire, educate, and connect individuals who share a
          passion for artistic expression, whether through traditional
          paintings, digital art, surreal creations, or nature-inspired pieces.
        </p>
      </div>

      <motion.div
        className=" h-[25rem] p-8  w-full flex justify-center items-center"
        ref={container}
      >
        <motion.div
          style={{ y: progressValue }}
          className="flex flex-col justify-center items-start w-[30%] h-full "
        >
          <h4 className="text-white font-semibold text-2xl tracking-tighter text-center mb-2">
            Our Purpose
          </h4>
          <p className="text-xs font-medium tracking-tighter text-zinc-400 w-full text-justify">
            Arteora is an innovative platform designed to bridge the gap between
            artists and art enthusiasts by providing a dynamic space to explore,
            showcase, and connect. The project aims to celebrate creativity by
            offering artists a dedicated marketplace to display and sell their
            artworks, while enabling users to discover a variety of art forms
            that resonate with their interests. Arteora fosters a vibrant
            community, empowering artists to gain visibility and buyers to
            access unique pieces, promoting cultural expression and appreciation
            in a digital space.
          </p>
        </motion.div>
        <motion.div
          style={{ y: progressValue }}
          className="relative flex justify-center items-center w-[30%]"
        >
          <img
            src={monalisa}
            alt="monalisa"
            className="w-full h-full object-cover scale-75"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-black dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 top-0 left-0 w-1/3 bg-gradient-to-r from-black dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black dark:from-background"></div>

          {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-black dark:from-background"></div> */}
        </motion.div>
        <motion.div
          style={{ y: progressValue }}
          className="flex flex-col justify-center items-start w-[30%] p-7 "
        >
          <h4 className="text-white font-semibold text-2xl tracking-tighter text-center mb-2">
            Our Target
          </h4>
          <p className="text-xs font-medium tracking-tighter text-zinc-400 text-justify pb-24">
            Our target is to create a vibrant online hub where artists can
            showcase their work, and art lovers can discover and support
            creativity effortlessly.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        ref={storyContainer}
        className="w-full h-[25rem] flex justify-center items-center gap-5"
      >
        <motion.div
          style={{ y: progress2Value }}
          className=" h-full flex flex-col justify-center items-left "
        >
          <h1 className="text-white font-bold tracking-tight text-5xl text-center flex justify-start items-center">
            <ArrowDownRight color="white" size={64} />
            Our Story
          </h1>
        </motion.div>

        <motion.div
          style={{ y: progress2Value }}
          className="w-1/2 h-[10rem] rounded-xl p-10"
        >
          <p className="text-zinc-500 font-semibold text-justify tracking-tight text-md">
            Arteora started as a simple idea in 2022—a passion project by a
            group of friends who wanted to bridge the gap between artists and
            their audiences. After struggling to find platforms that truly
            supported creative talent, we envisioned Arteora as a place where
            artists could thrive, collaborate, and connect. Today, we’re proud
            to be a community of over 10,000 creators and art enthusiasts.
          </p>
        </motion.div>
      </motion.div>

      <motion.div ref={CTAref} className="flex justify-center items-center gap-10 w-full h-[25rem] ">
        <motion.div
          className="relative w-[70%] rounded-2xl border border-zinc-800 h-full flex flex-col justify-center items-center p-5  mb-20  bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Office})`,y:progress3Value }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>

          <Store color="white" size={32} className="z-[100]" />
          <h1 className="text-white font-semibold text-4xl z-[100]">
            Discover Arts
          </h1>
          <p className="text-zinc-300 font-medium text-sm text-center z-[100] mb-3 ">
            Discover unique art pieces from talented creators around the globe
          </p>
          <button onClick={()=>navigate('/artworks')} className="bg-white z-[100] rounded-xl w-[8rem] h-[2.5rem] flex justify-center items-center font-medium active:scale-95 active:duration-75">
            <ArrowUpRight color="black" />
            Visit
          </button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}
