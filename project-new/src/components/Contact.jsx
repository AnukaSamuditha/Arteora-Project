import React from "react";
import Footer from "./Footer";

export default function Contact() {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-start">
      <div className="flex flex-col w-full h-[30vh] lg:h-[45vh] justify-center items-center bg-black relative">
        <div className="absolute inset-0 bg-dot-white/[0.2] dark:bg-dot-white/[0.2]"></div>

        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h1 className="text-white  text-center text-5xl font-bold tracking-tighter">
          Get in touch
        </h1>
        <p className="text-zinc-400 w-[90%] lg:w-auto text-sm font-semibold text-center mt-3">
          Have questions, feedback, or simply want to connect? Reach out to
          us—let's create something amazing together!
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="lg:w-[35%] w-[80%]">
          <h1 className="text-white font-bold text-left text-2xl tracking-tighter">
            Message us
          </h1>
          <p className="text-zinc-400 z-[100] text-sm font-semibold ">
            We will get back to you within 24 hours
          </p>
        </div>
        <form className="lg:w-[35%] w-[80%] mt-5 flex flex-col justify-center items-start gap-3 mb-12">
          <div className="w-full flex justify-center items-center gap-4">
            <div className="w-[50%] flex flex-col justify-center items-start">
              <label htmlFor="firstname" className="text-white text-sm">
                First name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="w-full h-[3rem] border text-white p-3 border-zinc-800 rounded-xl bg-transparent placeholder:text-zinc-500 placeholder:text-sm"
              />
            </div>

            <div className="w-[50%] flex flex-col justify-center items-start">
              <label htmlFor="lastname" className="text-white text-sm">
                Last name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                className="w-full h-[3rem] border text-white p-3 border-zinc-800 rounded-xl bg-transparent placeholder:text-zinc-500 placeholder:text-sm"
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="email" className="text-white text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full h-[3rem] border text-white p-3 border-zinc-800 rounded-xl bg-transparent placeholder:text-zinc-500 placeholder:text-sm"
            />
          </div>

          {/* <div className="w-full">
            <label htmlFor="mobile" className="text-white text-sm">
              Phone number
            </label>
            <input
              type="tel"
              name="mobile"
              className="w-full h-[3rem] text-white p-3 border border-zinc-800 rounded-xl bg-transparent"
            />
          </div> */}

          <div className="w-full">
            <label htmlFor="message" className="text-white text-sm">
              Message
            </label>
            <textarea
              type="text"
              rows={8}
              name="message"
              placeholder="Leave us a message..."
              className="w-full  border border-zinc-800 rounded-xl bg-transparent text-white p-3 placeholder:text-zinc-500 placeholder:text-sm"
            />
          </div>

          <div className="w-full">
            
            <button
              className="w-full h-[3rem] bg-[#0071e3] rounded-xl  text-white font-medium text-sm p-3 active:scale-95 active:duration-75"
            >Send message</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
