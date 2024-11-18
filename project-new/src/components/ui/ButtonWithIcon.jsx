import { MailOpen } from "lucide-react"
import { Brain } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
  return (
    <Button className="bg-white hover:bg-white text-black rounded-[8px] mr-3 ">
      <Brain className="text-black"/> Publish Artwork
    </Button>
  )
}