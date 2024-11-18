import Safari from "@/components/ui/safari";
import Image1 from '../../Images/artworksTab.webp';

export function SafariDemo() {
  return (
    <div className="relative">
      <Safari url="arteora.com" className="size-full" src={Image1} />
    </div>
  );
}
