import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MarqueeDemo } from "./ArtworksMarquee";
import { SafariDemo } from "./SafariDemo";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Lenis from "lenis";
import { ChevronLeft, ChevronRight, Drama, User } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import ShineBorder from "./shine-border";
import AvatarCircles from "./AvatarCircles";
import { MagicCard } from "./magic-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImagesColumn from "./ImagesColumn";
import { useNavigate } from "react-router-dom";
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import image6 from "../../Images/image5.jpg";
import image7 from "../../Images/image6.jpg";
import image8 from "../../Images/image8.jpg";
import image9 from "../../Images/image9.jpg";
import image10 from "../../Images/image10.jpg";
import image11 from "../../Images/Image11.jpg";
import image12 from "../../Images/Image12.jpg";
import image13 from "../../Images/image13.jpg";
import image14 from "../../Images/image14.jpg";
import Footer from "../Footer";

export default function Home() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [activeCard, setActiveCard] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log("this is image", image1);
  const cardInfo = [
    {
      name: "Anuka Samuditha",
      profile: "https://github.com/shadcn.png",
      category: "Artist",
      review:
        "After I met Arteora, things changed a lot, and my career was refreshed with this platform",
    },
    {
      name: "Anuka Samuditha",
      profile: "https://github.com/shadcn.png",
      category: "Artist",
      review:
        "After I met Arteora, things changed a lot, and my career was refreshed with this platform",
    },
    {
      name: "Anuka Samuditha",
      profile: "https://github.com/shadcn.png",
      category: "Artist",
      review:
        "After I met Arteora, things changed a lot, and my career was refreshed with this platform",
    },
  ];

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
  const artsContainer = useRef(null);
  const magicCardRef = useRef(null);

  const [isInview, setInView] = useState(false);

  function checkInView() {
    if (useInView(magicCardRef, { once: true })) {
      setActiveCard();
    }
  }

  const { scrollYProgress: progress1 } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  const { scrollYProgress: progress2 } = useScroll({
    target: featuresContainer,
    offset: ["start end", "start center"],
  });

  const { scrollYProgress: progress4 } = useScroll({
    target: artsContainer,
    offset: ["start end", "end start"],
  });

  const scaleValue = useTransform(progress1, [0, 1], [0.7, 1]);
  const featuresScale = useTransform(progress2, [0, 1], [0, 1]);

  const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
  const multiplier1 = isMobile ? 1 : 2;
  const multiplier2 = isMobile ? 1.5 : 3.3;
  const multiplier3 = isMobile ? 1 : 1.25;
  const multiplier4 = isMobile ? 1.5 : 3;

  const y1 = useTransform(progress4, [0, 1], [0, windowHeight * multiplier1]);
  const y2 = useTransform(progress4, [0, 1], [0, windowHeight * multiplier2]);
  const y3 = useTransform(progress4, [0, 1], [0, windowHeight * multiplier3]);
  const y4 = useTransform(progress4, [0, 1], [0, windowHeight * multiplier4]);

  //console.log(featuresScale);

  const artistsContainer = useRef(null);

  const { scrollYProgress: progress3 } = useScroll({
    target: artistsContainer,
    offset: ["start end", "end start"],
  });

  const lg = useTransform(progress3, [0, 1], [0, -130]);
  const md = useTransform(progress3, [0, 1], [0, -100]);
  const sm = useTransform(progress3, [0, 1], [0, -90]);

  const cardArr = cardInfo.map((card) => {
    return (
      <MagicCard
        ref={magicCardRef}
        style={md}
        className="lg:hidden cursor-pointer snap-center flex-col items-center justify-center p-3 text-4xl bg-zinc-900 min-w-[70vw] lg:w-[20%] h-[15rem] border-zinc-700 shadow-zinc-800 shadow-3d"
        gradientColor="#262626"
      >
        <div className="w-full h-[30%] flex justify-center items-center gap-3 mb-5">
          <Avatar className="z-[-3] blur-0 w-[4rem] h-[4rem]">
            <AvatarImage src={card.profile} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h5 className="text-sm leading-none text-white font-medium text-center">
          {card.name}
        </h5>
        <h5 className="text-xs leading-none text-zinc-400 text-center p-2">
          {card.category}
        </h5>
        <p className="text-white text-xs tracking-wide text-center w-full p-3 h-[50%] italic mt-1">
          {card.review}
        </p>
      </MagicCard>
    );
  });

  function handleActiveCard(direction) {
    setActiveCard((prev) => {
      if (direction === "right") {
        return prev + 1 >= cardArr.length ? 0 : prev + 1; // Reset to 0 if exceeding length
      } else {
        return prev - 1 < 0 ? cardArr.length - 1 : prev - 1; // Go to the last card if negative
      }
    });
  }

  const ImageUrls = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
  ];

  function forwardSignup() {
    navigate("/signup");
  }

  return (
    <div className="flex flex-col justify-start items-center w-full h-full">
      <div className="flex flex-col w-full h-[60vh] mb-5 lg:mb-2 lg:h-[75vh] lg:mt-16  justify-start items-center bg-black dark:bg-black bg-dot-white/[0.2] dark:bg-dot-white/[0.2] relative">
        {/* Radial gradient for the background effect */}
        <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h1 className="font-[600]  text-4xl lg:text-[65px] w-[90%] tracking-tight leading-snug text-center mt-5 relative z-10  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Discover and Collect{" "}
          <span className="lg:text-[65px] text-4xl"> Art from </span>
          <span className="bg-gradient-to-r from-lime-300 to-yellow-400 inline-block text-transparent bg-clip-text">
            Emerging Creators
          </span>
        </h1>
        <p className="text-md w-full text-center p-4 text-gray-400  mb-2 relative z-10">
          Explore curated collections, support talented artists, and find the
          perfect piece to elevate your space
        </p>
        <div className="flex justify-center items-center w-[300px] h-[80px] gap-5 relative z-10">
          <Button
            variant="destructive"
            onClick={forwardSignup}
            className="bg-green-400 text-black rounded-xl w-[110px] h-10 font-semibold hover:bg-green-400"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className=" text-white bg-transparent  rounded-xl w-[110px] h-10 font-[500] hover:text-black"
          >
            Sign In
          </Button>
        </div>
      </div>

      <MarqueeDemo />
      {/* <Separator className="my-4 mt-5 mb-5 text-zinc-800"/> */}

      <h2 className="scroll-m-20 pb-2 text-white text-4xl lg:text-5xl font-semibold tracking-tight first:mt-0 mt-28 mb-5">
        What is Arteora?
      </h2>
      {/* <CardDemo/> */}
      {/* <div className="w-full h-[50vh] flex justify-center items-center ">
        <img src={Image1} className="w-[70%] h-[100%] object-cover"/>
      </div> */}
      <p className="text-md lg:text-sm text-zinc-500 w-[80%] lg:w-[50%] text-justify font-medium">
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
        className="w-full p-5 lg:w-[60%] h-auto mt-8 flex justify-center items-center"
      >
        <SafariDemo />
      </motion.div>

      <Separator className="my-4 w-[80%] bg-zinc-800 h" />
      <h2 className="scroll-m-20 pb-2 text-white text-4xl text-center p-5  lg:text-5xl font-semibold tracking-tight first:mt-0 mt-5 mb-5 ">
        Revolutionizing the Art Experience
      </h2>
      <motion.div className="flex lg:flex-row flex-col justify-center items-center lg:w-[90%] w-full h-auto p-5 gap-9 relative">
        <ShineBorder
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          className="flex flex-col justify-center items-center w-[90%] lg:w-[40%] h-full border rounded-xl bg-background md:shadow-xl overflow-hidden"
        >
          <motion.div
            ref={featuresContainer}
            style={{ opacity: featuresScale }}
            className="flex flex-col justify-center items-center p-2"
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
          className="flex flex-col justify-center items-center w-[90%] lg:w-[40%] h-full border rounded-[8px] bg-background md:shadow-xl overflow-hidden"
        >
          <motion.div
            ref={featuresContainer}
            style={{ opacity: featuresScale }}
            className="flex flex-col justify-center items-center p-2"
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
          className="flex flex-col justify-center items-center w-[90%] lg:w-[40%] h-full border rounded-[8px] bg-background md:shadow-xl overflow-hidden"
        >
          <motion.div
            ref={featuresContainer}
            style={{ opacity: featuresScale }}
            className="flex flex-col justify-center items-center p-2"
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
      <Separator className="my-4 w-[80%] bg-zinc-800 mt-5" />

      <motion.div className="h-auto relative w-full flex flex-col items-center justify-start">
        <h2 className="scroll-m-20 pb-2 text-white text-center text-4xl lg:text-5xl font-semibold tracking-tight mt-5 mb-3 ">
          Discover Our Artistic Community
        </h2>
        <p className="text-sm text-zinc-400 text-center mb-7 w-[90%]">
          Join a vibrant network of passionate artists and art lovers, united by
          creativity and innovation.
        </p>
        <AvatarCircles />

        <motion.div
          ref={artistsContainer}
          className="flex justify-center lg:justify-center items-center  w-[90%] h-[25rem] lg:h-[500px] gap-5 lg:gap-8 mt-5"
        >
          <MagicCard
            style={md}
            className="hidden lg:flex cursor-pointer snap-center flex-col items-center justify-start p-3 text-4xl bg-zinc-900 min-w-[70vw] lg:min-w-[20%] lg:w-[20%] h-[15rem] lg:h-[60%] border-zinc-700 shadow-zinc-800 shadow-3d"
            gradientColor="#262626"
          >
            <div className="w-full h-[35%] flex justify-center items-center gap-3 mb-4">
              <Avatar className="z-[-3] blur-0 w-[5rem] h-[5rem]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <h5 className="text-sm leading-none text-white font-medium text-center">
              Anuka Samuditha
            </h5>
            <h5 className="text-xs leading-none text-zinc-700 text-center">
              Digital Illustrator
            </h5>
            <p className="text-white text-xs text-justify w-full h-[50%] italic mt-5">
              "Arteora is a breath of fresh air for artists like me! The
              platform has given me a space to showcase my work and connect with
              fellow creatives. The design is sleek, and the tools are easy to
              use. Highly recommended"
            </p>
          </MagicCard>
          <MagicCard
            style={lg}
            className="hidden lg:flex cursor-pointer snap-center flex-col items-center justify-start p-3 bg-zinc-900 text-4xl dark:bg-[#262626] min-w-[70vw] lg:min-w-[20%] lg:w-[22%] lg:h-[70%] h-[15rem]  border-zinc-700 shadow-zinc-800 shadow-3d "
            gradientColor="#262626"
          >
            <div className="w-full h-[35%] flex justify-center items-center gap-3 mb-4">
              <Avatar className="z-[-3] blur-0 w-[5rem] h-[5rem]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <h5 className="text-sm leading-none text-white font-medium text-center">
              Anuka Samuditha
            </h5>
            <h5 className="text-xs leading-none text-zinc-700 text-center">
              Digital Illustrator
            </h5>
            <p className="text-white text-xs text-justify w-full h-[50%] italic mt-5">
              "Arteora is a breath of fresh air for artists like me! The
              platform has given me a space to showcase my work and connect with
              fellow creatives. The design is sleek, and the tools are easy to
              use. Highly recommended"
            </p>
          </MagicCard>

          <MagicCard
            style={sm}
            className="hidden lg:flex cursor-pointer flex-col snap-center items-center justify-start p-3 text-4xl bg-zinc-900 min-w-[70vw]  lg:w-[20%] lg:min-w-[20%] h-[15rem] lg:h-[60%] border border-zinc-700 shadow-zinc-800 shadow-3d"
            gradientColor="#262626"
          >
            <div className="w-full h-[35%] flex justify-center items-center gap-3 mb-4">
              <Avatar className="z-[-3] blur-0 w-[5rem] h-[5rem]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <h5 className="text-sm leading-none text-white font-medium text-center">
              Anuka Samuditha
            </h5>
            <h5 className="text-xs leading-none text-zinc-700 text-center">
              Digital Illustrator
            </h5>
            <p className="text-white text-xs text-justify w-full h-[50%] italic mt-5">
              "Arteora is a breath of fresh air for artists like me! The
              platform has given me a space to showcase my work and connect with
              fellow creatives. The design is sleek, and the tools are easy to
              use. Highly recommended"
            </p>
          </MagicCard>

          <motion.div className="lg:hidden w-full h-[10rem]">
            <div className="flex justify-center items-center w-full h-[10rem] lg:hidden gap-3">
              <motion.div
                style={{ y: md }}
                className="h-full justify-center items-center"
              >
                <ChevronLeft
                  size={24}
                  color="white"
                  onClick={() => handleActiveCard("left")}
                  className="h-full"
                />
              </motion.div>
              {cardArr[activeCard]}
              <motion.div
                style={{ y: md }}
                className="h-full justify-center items-center"
              >
                <ChevronRight
                  size={24}
                  color="white"
                  onClick={() => handleActiveCard("right")}
                  className="h-full"
                />
              </motion.div>
            </div>
          </motion.div>
          {/* {cardArr} */}
        </motion.div>
      </motion.div>

      <Separator className="my-2 w-[80%] bg-zinc-800 " />

      <h2 className="scroll-m-20 pb-2 text-white text-center text-4xl lg:text-5xl font-semibold tracking-tight first:mt-0 mt-3  p-5 lg:mt-14 ">
        Variety of Creative Works
      </h2>
      <p className="text-sm text-zinc-400 text-center w-[90%] mb-7 lg:w-[60%]">
        Arteora offers a rich collection of artistic creations, from digital
        masterpieces to traditional sculptures. Discover unique styles and
        expressions that inspire and captivate.
      </p>
      <div className="h-[10vh]"></div>
      <div
        ref={artsContainer}
        className="w-[90%] h-[185vh] relative overflow-hidden flex flex-col lg:flex-row justify-center items-start lg:items-center p-4 lg:gap-4"
      >
        <ImagesColumn
          Image1={ImageUrls[0]}
          Image2={ImageUrls[13]}
          Image3={ImageUrls[12]}
          Y={y1}
        />
        <ImagesColumn
          Image1={ImageUrls[3]}
          Image2={ImageUrls[1]}
          Image3={ImageUrls[2]}
          Y={y2}
        />
        <ImagesColumn
          Image1={ImageUrls[6]}
          Image2={ImageUrls[7]}
          Image3={ImageUrls[8]}
          Y={y3}
        />
        <ImagesColumn
          Image1={ImageUrls[9]}
          Image2={ImageUrls[10]}
          Image3={ImageUrls[11]}
          Y={y4}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black dark:from-background"></div>
      </div>
      <div className="h-[10vh]"></div>
      <Footer/>
    </div>
  );
}
