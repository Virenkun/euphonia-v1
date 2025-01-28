/* eslint-disable @next/next/no-img-element */
"use client";

import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import Iphone15Pro from "../ui/iphone-15-pro";
import Safari from "../ui/safari";

export default function Hero() {
  const isMobile = useIsMobile();
  console.log(isMobile, "iss");
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-col  justify-center items-center lg:gap-2 md:gap-2 sm:gap-2 gap-2">
          <div className="flex items-center justify-center">
            <a
              href="https://www.producthunt.com/posts/euphonia?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-euphonia"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=826294&theme=dark&t=1738065505060"
                alt="Euphonia - Your&#0032;AI&#0032;talking&#0032;buddy&#0032;here&#0032;to&#0032;listen&#0032;and&#0032;help | Product Hunt"
                style={{ width: "200px", height: "54px" }}
                width="200"
                height="48"
              />
            </a>
          </div>
          <div className="lg:w-[90%] md:w-full sm:w-full w-full text-center text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 lg:mb-6 md:mb-4 sm:mb-2 tracking-normal lg:tracking-wide  md:tracking-normal">
            Therapy but make <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              {" "}
              it fun & way more easy
            </span>
          </div>
          <h2 className="lg:w-[65%] md:w-[75%] w-full text-center text-sm sm:text-base md:text-lg lg:text-2xl lg:font-semibold font-medium text-gray-700 lg:mb-6 md:mb-4 sm:mb-2">
            Spill your thoughts, get answers, share secrets <br /> (we won’t
            even tell your diary).
          </h2>
          <p className="lg:w-[55%] md:w-[65%] sm:w-full w-full text-center lg:text-xl md:text-md sm:text-sm text-sm text-gray-600 mb-8">
            {`Meet your new favorite therapist: always awake, never out of
              coffee, and ready to listen without saying, "Tell me how that
              makes you feel." Your mental wellness, served with a side of AI
              magic.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signin/signup">
              <RainbowButton className="font-bold lg:text-xl md:text-md lg:px-10  lg:py-7 md:px-8 md:py-5 rounded-lg transition-transform hover:scale-105">
                Experience Euphonia Now
              </RainbowButton>
            </Link>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 relative mt-36"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full filter blur-3xl opacity-30"></div>
            <div className="relative">
              <Image
                src="/main.png"
                alt="AI Therapist Illustration"
                width={900}
                height={900}
                className="rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 mix-blend-overlay"></div>
            </div>
          </motion.div> */}
          {!isMobile ? (
            <div className="relative mt-28">
              <Safari
                url="euphonia.me"
                className="size-full"
                videoSrc="/loop.mp4"
              />
            </div>
          ) : (
            <div className="w-full mt-8">
              {/* <video
                height="600"
                width="600"
                autoPlay
                muted
                loop
                playsInline
                className="border border-indigo-400 p-2 rounded-lg"
              >
                <source src="/phonevideo.mp4" type="video/mp4" />
                Your browser does not support the video tag...
              </video> */}
              <div className="relative">
                <Iphone15Pro className="size-full" videoSrc="/phonevideo.mp4" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50 to-indigo-50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-center bg-repeat opacity-5 -z-10"></div>
      {/* <video height="600" width="600" autoPlay muted loop>
        <source src="/loop.mp4" type="video/mp4" />
        Your browser does not support the video tag...
      </video> */}
    </section>
  );
}
