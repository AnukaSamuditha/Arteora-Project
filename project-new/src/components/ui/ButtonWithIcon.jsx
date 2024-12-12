import { MailOpen } from "lucide-react"
import { Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

export function ButtonWithIcon() {
  const[cookies,setCookie,removeCookie]=useCookies(['loggedUser']);
  const navigate=useNavigate();

  function handlePublish(){
    if(cookies.loggedUser){
      navigate('/dashboard/artworks/publish-artwork');
    }
    else{
      navigate('/login');
    }
  }
  return (
    <Button className="bg-white hidden lg:flex hover:bg-white text-black rounded-[8px] mr-5" onClick={handlePublish}>
      <Brain className="text-black"/> Publish Artwork
    </Button>
  )
}
