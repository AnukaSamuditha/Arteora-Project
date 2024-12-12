import Safari from "@/components/ui/safari";
import Image1 from '../../Images/artworksTab.webp';
import BackgroundImage from '../../Images/artworksBg.png'

export function SafariDemo() {
  return (
    <div className="relative">
      <Safari url="arteora.com" className="size-full" src={BackgroundImage} />
    </div>
  );
}
