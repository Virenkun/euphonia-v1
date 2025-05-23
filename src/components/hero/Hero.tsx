/* eslint-disable @next/next/no-img-element */
"use client";

import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import Iphone15Pro from "../ui/iphone-15-pro";
import Safari from "../ui/safari";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className="py-8 md:py-16 overflow-hidden">
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
          <figure className="max-w-screen-md mx-auto text-center my-8">
            <svg
              className="w-8 h-8 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-xl italic font-medium text-gray-900 dark:text-white">
                {` "AI won’t replace therapists, but it can provide a bridge for those who don’t have access to one."`}
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
              <img
                className="w-4 h-4 rounded-full"
                src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTOOIquVIk-AUTan-9Rf0sG-Gl9P7ngVNdC2oLFUFc-4gkiB1wydkt2s36vjC8c7C8Xhtj6cxHNHEPR9xw"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                <cite className="pe-3 text-sm font-medium text-gray-900 dark:text-white">
                  Andrew Ng
                </cite>
                <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                  Co-founder of Google Brain
                </cite>
              </div>
            </figcaption>
          </figure>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-gray-900 tracking-tight mb-4">
            Talk, Heal, Grow. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              The way it should be.
            </span>
          </h1>

          <p className="lg:w-[55%] md:w-[65%] sm:w-full w-full text-center lg:text-xl md:text-md sm:text-sm text-sm text-gray-800 mb-8">
            {`Meet your new favorite therapist always awake, never out of
              coffee, and ready to listen without saying "Tell me how that
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
