import { cn } from "@/lib/utils";
import Marquee from "./marquee";
import img2 from '../../Images/image2.jpg';
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import image6 from "../../Images/image6.jpg";
import image7 from "../../Images/image7.jpg";

const reviews = [
    {
      name: "Whispering Horizons",
      body: "A breathtaking exploration of dusk's gentle transition to night, capturing a serene blend of warm and cool tones.",
      img: img2,
    },
    {
      name: "Eternal Bloom",
      body: "A vivid depiction of flowers in eternal bloom, symbolizing nature’s resilience and the cycle of life.",
      img: image3,
    },
    {
      name: "Celestial Drift",
      body: "An abstract representation of the stars, showcasing the mystery and beauty of our galaxy in swirling colors.",
      img: image4,
    },
    {
      name: "Silent Echo",
      body: "A minimalist piece that uses negative space and muted colors to evoke a sense of quiet and introspection.",
      img: image5,
    },
    {
      name: "Luminous Pathways",
      body: "A journey through illuminated landscapes, blending light and shadow to guide viewers through hidden trails.",
      img: image6,
    },
    {
      name: "Dreamscape Mirage",
      body: "A surreal mix of colors and shapes, inviting viewers to explore a fantastical world beyond the limits of reality.",
      img: image7,
    },
  ];
  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, body }) => {
  return (
    <figure
      className={cn(
        "relative w-[180px] h-[240px] flex justify-center items-center cursor-pointer overflow-hidden rounded-xl border",
        // Light mode styles
        "border-gray-300 bg-white hover:bg-gray-100",
        // Dark mode styles
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img src={img} alt="" className="w-full h-full object-fill"/>
        </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee> */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black dark:from-background"></div>
    </div>
  );
}
